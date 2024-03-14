rm -rf standalone
npm run build &&
cp -r .next/standalone .
cp -r .next/static standalone/.next/
cp -r ./public/ standalone/
sed -i 's/const currentPort = parseInt(process.env.PORT, 10) || 3000/const currentPort = 27012/' standalone/server.js
sed -i "s/const hostname = process.env.HOSTNAME || '0.0.0.0'/const hostname = '0.0.0.0'/" standalone/server.js
cd standalone
