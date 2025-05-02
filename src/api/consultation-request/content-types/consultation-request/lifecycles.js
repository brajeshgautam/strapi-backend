module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // Find the highest existing token number
    const latestRequest = await strapi.entityService.findMany(
      'api::consultation-request.consultation-request',
      {
        sort: { tokenNumber: 'desc' },
        limit: 1,
        fields: ['tokenNumber'], // Only fetch the tokenNumber field
      }
    );

    // Determine the next token number
    let nextTokenNumber = 1; // Start from 1 if no requests exist
    if (latestRequest && latestRequest.length > 0 && latestRequest[0].tokenNumber) {
      nextTokenNumber = latestRequest[0].tokenNumber + 1;
    }

    // Assign the next token number to the data being created
    data.tokenNumber = nextTokenNumber;

    // Explicitly set the status as the schema default isn't reliable here
    data.status = 'Token Issued';

    // Note: The client relationship should be being set correctly in the incoming request.
    // For example, the client ID should be part of event.params.data
    if (!data.client) {
      console.error('ERROR: Client relation not provided during ConsultationRequest creation.');
      // Optionally throw an error to prevent creation without a client
      // throw new Error('Client relation is required.');
    }
  },

  async afterCreate(event) {
    const { result } = event; // result contains the newly created (and published) record

    // --- Send Token Confirmation Email --- 
    // Use the 'result' directly, as it's already published with the correct status (hopefully!)
    const finalResult = await strapi.entityService.findOne(
      'api::consultation-request.consultation-request',
      result.id,
      { populate: { client: true } } 
    );

    if (!finalResult) {
        console.error(`Could not re-fetch Consultation Request ID ${result.id}.`);
        return;
    }

    // Check if status is as expected before sending email
    if (finalResult.status !== 'Token Issued') {
        console.warn(`Consultation Request ID ${result.id} has status '${finalResult.status}', expected 'Token Issued'. Email not sent.`);
        return;
    }

    try {
      // 1. Get Admin Settings (Email Templates)
      const adminSettings = await strapi.entityService.findMany('api::admin-setting.admin-setting');
      if (!adminSettings || !adminSettings.tokenConfirmationEmailSubject || !adminSettings.tokenConfirmationEmailBody) {
        console.error('Token confirmation email template not configured in Admin Settings.');
        return; // Don't proceed if template is missing
      }

      // 2. Get Client Email (Use finalResult)
      if (!finalResult.client || !finalResult.client.email) {
        console.error(`Could not find client email for Consultation Request ID: ${finalResult.id}`);
        return;
      }
      const clientEmail = finalResult.client.email;
      const clientName = finalResult.fullName || finalResult.client.username; // Use fullName if available

      // 3. Prepare Email Content (Replace Placeholders)
      let emailSubject = adminSettings.tokenConfirmationEmailSubject;
      let emailBody = adminSettings.tokenConfirmationEmailBody;

      // Basic placeholder replacement (you might want a more robust template engine later)
      emailSubject = emailSubject.replace('{tokenNumber}', finalResult.tokenNumber);
      emailBody = emailBody.replace('{clientName}', clientName);
      emailBody = emailBody.replace('{tokenNumber}', finalResult.tokenNumber);
      // Add more replacements as needed (e.g., {query}, {submissionDate})

      // 4. Send Email
      await strapi.plugin('email').service('email').send({
        to: clientEmail,
        subject: emailSubject,
        html: emailBody, // Assuming body is HTML from the Rich Text editor
        // text: // Optional: Provide a plain text version
      });

      console.log(`Token confirmation email sent successfully to ${clientEmail} for token ${finalResult.tokenNumber}`);

    } catch (err) {
      console.error('Error sending token confirmation email:', err);
    }
  },
};
