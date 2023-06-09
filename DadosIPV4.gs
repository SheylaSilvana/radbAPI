function splitSubnet22(sub-rede) {
  var ipParts = subnet.split('.');
  var baseIP = parseInt(ipParts[0]) * 256 * 256 * 256 + parseInt(ipParts[1]) * 256 * 256 + parseInt(ipParts[2]) * 256 + parseInt(ipParts[3].split('/ ')[0]);
  var firstSubnetIP = baseIP;
  var secondSubnetIP = baseIP + Math.pow(2, (32 - 23));

  var firstSubnet = (firstSubnetIP >>> 24) + '.' + ((firstSubnetIP >> 16) & 255) + '.' + ((firstSubnetIP >> 8) & 255) + '.' + (firstSubnetIP & 255) + '/23';
  var secondSubnet = (secondSubnetIP >>> 24) + '.' + ((secondSubnetIP >> 16) & 255) + '.' + ((secondSubnetIP >> 8) & 255) + '.' + (secondSubnetIP & 255) + '/23';

  return [primeiraSub-rede, segundaSub-rede];
}

function getValidIPv4AddressesWithSubnet() {
  var ss = SpreadsheetApp.openById('ID da planilha');
  var planilha = ss.getSheets()[0];
  var últimaLinha = planilha.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var range = sheet.getRange(lastRow, 1, 1, lastColumn);
  valores var = range.getValues();
  var coluna4 = valores[0][3];
  var coluna6 = valores[0][5];

  coluna4 = coluna4.replace(/\s/g,'');
  coluna6 = coluna6.replace(/\s/g,'');

  var isIPv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5] |2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9] |[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0 -9]?)\/(3[0-2]|[1-2][0-9]|[0-9]|[0-9][0-9]|[1-2][0 -9][0-9]|3[0-2][0-9])$/;

  var ipv4Addresses4 = coluna4.split(',');
  var validIPv4Addresses4 = [];

  var ipv4Addresses6 = coluna6.split(',');
  var validIPv4Addresses6 = [];

  var ipv4AddressesWithSubnet22_4 = "";
  var ipv4AddressesWithSubnet23_4 = "";
  var ipv4AddressesWithSubnet24_4 = "";

  var ipv4AddressesWithSubnet22_6 = "";
  var ipv4AddressesWithSubnet23_6 = "";
  var ipv4AddressesWithSubnet24_6 = "";


  for (var i = 0; i < ipv4Addresses4.length; i++) {
    if (isIPv4.test(ipv4Addresses4[i].trim())) {
      validIPv4Addresses4.push(ipv4Addresses4[i].trim());
      if (ipv4Addresses4[i].includes('/22')) {
        ipv4AddressesWithSubnet22_4 += ipv4Addresses4[i].trim() + "\n";
      } else if (ipv4Addresses4[i].includes('/23')) {
        ipv4AddressesWithSubnet23_4 += ipv4Addresses4[i].trim() + "\n";
      } else if (ipv4Addresses4[i].includes('/24')) {
        ipv4AddressesWithSubnet24_4 += ipv4Addresses4[i].trim() + "\n";
      }
    }
  }

    for (var i = 0; i < ipv4Addresses6.length; i++) {
    if (isIPv4.test(ipv4Addresses6[i].trim())) {
      validIPv4Addresses6.push(ipv4Addresses6[i].trim());
      if (ipv4Addresses6[i].includes('/22')) {
        ipv4AddressesWithSubnet22_6 += ipv4Addresses6[i].trim() + "\n";
      } else if (ipv4Addresses6[i].includes('/23')) {
        ipv4AddressesWithSubnet23_6 += ipv4Addresses6[i].trim() + "\n";
      } else if (ipv4Addresses6[i].includes('/24')) {
        ipv4AddressesWithSubnet24_6 += ipv4Addresses6[i].trim() + "\n";
      }
    }
}



  Logger.log("Endereços IPv4 válidos com submáscara /22 da coluna 4:");
  Logger.log(ipv4AddressesWithSubnet22_4);
  Logger.log("Endereços IPv4 válidos com submáscara /23 da coluna 4:");
  Logger.log(ipv4AddressesWithSubnet23_4);
  Logger.log("Endereços IPv4 válidos com submáscara /24 da coluna 4:");
  Logger.log(ipv4AddressesWithSubnet24_4);

  Logger.log("Endereços IPv4 válidos com submáscara /22 da coluna 6:");
  Logger.log(ipv4AddressesWithSubnet22_6);
  Logger.log("Endereços IPv4 válidos com submáscara /23 da coluna 6:");
  Logger.log(ipv4AddressesWithSubnet23_6);
  Logger.log("Endereços IPv4 válidos com submáscara /24 da coluna 6:");
  Logger.log(ipv4AddressesWithSubnet24_6);


// Use a função splitSubnet22 para dividir uma sub-rede /22 em duas sub-redes /23
  var subnet22ToSplit = "192.168.0.0/22";
  var splittedSubnets = splitSubnet22(subnet22ToSplit);

  Logger.log("Sub-rede /22 original:");
  Logger.log(subnet22ToSplit);
  Logger.log("Sub-redes /23 consequencias:");
  Logger.log(splittedSubnets[0]);
  Logger.log(splittedSubnets[1]);
}
