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
      // 1. Get Admin Settings (Email Templates) - Use findOne for single types
      const adminSettings = await strapi.query('api::admin-setting.admin-setting').findOne({});

      // Check if admin settings exist and have the required fields
      if (!adminSettings || !adminSettings.tokenConfirmationEmailSubject || !adminSettings.tokenConfirmationEmailBody) {
        console.error('Admin settings for token confirmation email are missing or incomplete.');
        return; // Stop if email templates aren't configured
      }

      // 2. Prepare Email Content
      const subjectTemplate = adminSettings.tokenConfirmationEmailSubject;
      const bodyTemplate = adminSettings.tokenConfirmationEmailBody; // This is likely HTML/Markdown from RichText

      // 3. Replace Placeholders
      const subject = subjectTemplate.replace('{{tokenNumber}}', finalResult.tokenNumber);

      let body = bodyTemplate
        .replace(/{{tokenNumber}}/g, finalResult.tokenNumber)
        .replace(/{{fullName}}/g, finalResult.fullName || 'Client') // Added fallback
        .replace(/{{query}}/g, finalResult.query || 'N/A'); // Added fallback

      // Basic Markdown to HTML conversion if needed (consider a library for complex cases)
      // For simplicity, assuming the RichText editor outputs basic HTML or Markdown
      // that Nodemailer can handle or that you might process further.

      // 4. Send Email
      await strapi.plugin('email').service('email').send({
        to: finalResult.client.email,
        subject: subject,
        html: body, // Assuming body is HTML from the Rich Text editor
        // text: // Optional: Provide a plain text version
      });

      console.log(`Token confirmation email sent successfully to ${finalResult.client.email} for token ${finalResult.tokenNumber}`);

    } catch (err) {
      console.error('Error sending token confirmation email:', err);
    }
  },
};
