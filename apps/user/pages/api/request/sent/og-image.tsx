import { ImageResponse } from '@vercel/og';

import { formatCurrencyUtil } from '@gated/utils';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const amount = formatCurrencyUtil(Number(searchParams.get('amount')));
  const nonprofit = searchParams.get('nonprofit');

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 30,
          background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          verticalAlign: 'middle',
          overflow: 'hidden',
          border: '10px solid #C7C7C7',
          borderRadius: 50,
          flexDirection: 'column',
          color: 'white',
        }}
      >
        <svg
          width="140"
          height="129.5"
          viewBox="0 0 1200 1112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: 30 }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M762.539 85.8233C762.557 85.8407 762.574 85.8581 762.591 85.8755L1176.57 498.966C1207.76 530.094 1207.82 580.616 1176.69 611.81C1145.56 643.005 1095.04 643.059 1063.85 611.931L649.747 198.72C597.401 146.374 513.396 146.81 462.338 198.417L462.188 198.569L198.72 462.037C146.374 514.383 146.81 598.388 198.417 649.446L198.569 649.596L462.037 913.064C514.383 965.41 598.388 964.974 649.446 913.367L649.596 913.215L723.334 839.477C754.495 808.316 805.017 808.316 836.178 839.477C867.34 870.638 867.34 921.16 836.178 952.322L762.737 1025.76C648.876 1140.68 463.474 1140.19 349.193 1025.91L86.0174 762.733C-28.8933 648.872 -28.4042 463.472 85.8755 349.193L349.053 86.0156C462.894 -28.873 648.247 -28.4038 762.531 85.815C762.534 85.8178 762.537 85.8206 762.539 85.8233Z"
            fill="white"
          />
          <path
            d="M1007.62 672.475C1038.65 703.506 1038.65 754.042 1007.62 785.072C976.589 816.103 926.053 816.103 895.023 785.072C863.992 754.042 863.992 703.506 895.023 672.475C926.053 641.445 976.589 641.445 1007.62 672.475Z"
            fill="white"
          />
        </svg>

        <div
          style={{
            fontSize: '120px',
            fontWeight: 'bold',
          }}
        >
          {amount}
        </div>
        <div>donation requested via Gated to</div>
        <div
          style={{
            fontSize: '50px',
          }}
        >
          {nonprofit}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
