export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'bncohen925@gmail.com',
        subject: `New Kol Studio Inquiry from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
      })
    });

    if (res.ok) { return new Response('Success! Message sent. You can use the back button to return to the site.', { status: 200 }); }
    else { return new Response('Failed to send.', { status: 500 }); }
  } catch (e) { return new Response('Error', { status: 500 }); }
}
