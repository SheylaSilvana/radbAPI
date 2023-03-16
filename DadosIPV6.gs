function getValidIPv6Addresses() {
  var ss = SpreadsheetApp.openById('ID da planilha');
  var sheet = ss.getSheets()[0];
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var range = sheet.getRange(lastRow, 1, 1, lastColumn);
  var values = range.getValues();
  var coluna5 = values[0][4];
  var coluna6 = values[0][5];

  coluna5 = coluna5.replace(/\s/g,'');
  coluna6 = coluna6.replace(/\s/g,'');

  var isIPv6 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(\d+)$/;

  var ipv6Addresses5 = coluna5.split(',');
  var validIPv6Addresses5 = [];
  var ipv6Addresses6 = coluna6.split(',');
  var validIPv6Addresses6 = [];

  for (var i = 0; i < ipv6Addresses5.length; i++) {
    if (isIPv6.test(ipv6Addresses5[i].trim())) {
      validIPv6Addresses5.push(ipv6Addresses5[i].trim());
    }
  }

  for (var i = 0; i < ipv6Addresses6.length; i++) {
    if (isIPv6.test(ipv6Addresses6[i].trim())) {
      validIPv6Addresses6.push(ipv6Addresses6[i].trim());
    }
  }

  // Cria strings separadas para cada endereço IPv6 válido
  var ipv6String5 = validIPv6Addresses5.join('\n');
  var ipv6String6 = validIPv6Addresses6.join('\n');

  Logger.log("Endereços IPv6 válidos da coluna 5 separados em strings:");
  Logger.log(ipv6String5);
  Logger.log("Endereços IPv6 válidos da coluna 6 separados em strings:");
  Logger.log(ipv6String6);

  // Envia uma solicitação de API para cada endereço IPv6 válido
  var apiUrl = "https://api.radb.net/api/radb/route6?password='PASSWORD'";
  var options = {
    method: "PUT",
    headers: {
      "Authorization": "Basic ",
      "Content-Type": "application/json",
      "Accept": "text/plain"
    },
    muteHttpExceptions: true
  };

  // Envia a solicitação para cada endereço IPv6 válido da coluna 5
  for (var i = 0; i < validIPv6Addresses5.length; i++) {
    var payload = JSON.stringify({
      "objects": {
        "object": [
          {
            "type": "route6",
            "attributes": {
              "attribute": [
                {
                  "name": "route6",
                  "value": validIPv6Addresses5[i]
                },
                {
                  "name": "descr",
                  "value": values[0][1]
                },
                {
                  "name": "origin",
                  "value": values[0][2]
                },
                {
                  "name": "mnt-by",
                  "value": "MAINT-AS000000"
                },
                {
                  "name": "changed",
                  "value": "exemplo@gmail.com.br"
                },
                {
                  "name": "source",
                  "value": "RADB"
                }
              ]
            },
            "primary-key": {
              "attribute": [
                {
                  "name": "route6",
                  "value": validIPv6Addresses5[i]
                },
                {
                  "name": "origin",
                  "value": values[0][2]
                }
              ]
            },
            "source": {
              "id": "radb"
            }
          }
        ]
      }
    });

    options.payload = payload;
    var response = UrlFetchApp.fetch(apiUrl, options);
    var content = response.getContentText();

    if (response.getResponseCode() == 200) {
      Logger.log("IPv6 " + validIPv6Addresses5[i] + " cadastrado com sucesso!");
      Logger.log("Resultado: " + content);
    } else {
      Logger.log("Erro ao cadastrar o IPv6 " + validIPv6Addresses5[i] + ": " + content);
    }
  }

    // Envia a solicitação para cada endereço IPv6 válido da coluna 6
  for (var i = 0; i < validIPv6Addresses6.length; i++) {
    var payload = JSON.stringify({
      "objects": {
        "object": [
          {
            "type": "route6",
            "attributes": {
              "attribute": [
                {
                  "name": "route6",
                  "value": validIPv6Addresses6[i]
                },
                {
                  "name": "descr",
                  "value": values[0][1]
                },
                {
                  "name": "origin",
                  "value": values[0][2]
                },
                {
                  "name": "mnt-by",
                  "value": "MAINT-AS000000"
                },
                {
                  "name": "changed",
                  "value": "exemplo@gmail.com.br"
                },
                {
                  "name": "source",
                  "value": "RADB"
                }
              ]
            },
            "primary-key": {
              "attribute": [
                {
                  "name": "route6",
                  "value": validIPv6Addresses6[i]
                },
                {
                  "name": "origin",
                  "value": values[0][2]
                }
              ]
            },
            "source": {
              "id": "radb"
            }
          }
        ]
      }
    });
      
    options.payload = payload;
    var response = UrlFetchApp.fetch(apiUrl, options);
    var content = response.getContentText();

    if (response.getResponseCode() == 200) {
      Logger.log("IPv6 " + validIPv6Addresses6[i] + " cadastrado com sucesso!");
      Logger.log("Resultado: " + content);
    } else {
      Logger.log("Erro ao cadastrar o IPv6 " + validIPv6Addresses6[i] + ": " + content);
    }
  }
}
