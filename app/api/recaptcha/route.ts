export async function POST(req: Request) {
  const data = await req.json();
  const { token } = data;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    return new Response(JSON.stringify({ message: "Server configuration error" }), {
      status: 500,
    });
  }

  if (!token) {
    return new Response(JSON.stringify({ message: "Token not found" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Failed to verify" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
