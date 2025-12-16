const os = require('os');
const interfaces = os.networkInterfaces();

let ip = null;
for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    if (iface.family === 'IPv4' && !iface.internal) {
      if (iface.address.startsWith('192.168.') || iface.address.startsWith('10.')) {
        ip = iface.address;
        break;
      }
    }
  }
  if (ip) break;
}

if (ip) {
  console.log('\n📱 Pour accéder depuis votre téléphone, utilisez cette URL :');
  console.log(`\n   http://${ip}:3000\n`);
  console.log('⚠️  Assurez-vous que votre téléphone est sur le même réseau Wi-Fi que votre ordinateur.\n');
} else {
  console.log('\n❌ Impossible de trouver l\'adresse IP locale.\n');
}



