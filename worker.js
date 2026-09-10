const ALLOWED_IP = "119.203.202.154";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const clientIP = request.headers.get("CF-Connecting-IP");

    // Chỉ bảo vệ trang khách
    const protectedPaths = [
      "/",
      "/index.html",
      "/thankyou.html"
    ];

    if (
      protectedPaths.includes(url.pathname) &&
      clientIP !== ALLOWED_IP
    ) {
      return new Response(
        `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bao Coffee Siheung </title>
          <style>
            body {
              margin: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              font-family: Arial, sans-serif;
              background: #f5f5f5;
              padding: 20px;
            }

            .box {
              background: white;
              padding: 30px 25px;
              border-radius: 16px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.15);
              max-width: 400px;
            }

            h2 {
              margin-top: 0;
            }
          </style>
        </head>

        <body>
          <div class="box">
            <h2>📶 Vui lòng kết nối Wi-Fi của Bao Coffee</h2>
            <p>
              Bạn cần sử dụng Wi-Fi của quán để gửi yêu cầu bài hát.
            </p>
          </div>
        </body>
        </html>
        `,
        {
          status: 403,
          headers: {
            "content-type": "text/html; charset=UTF-8"
          }
        }
      );
    }

    return env.ASSETS.fetch(request);
  }
};
