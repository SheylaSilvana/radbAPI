function getValidASN() {
  var ss = SpreadsheetApp.openById('ID da planilha');
  var sheet = ss.getSheets()[0];
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var range = sheet.getRange(lastRow, 1, 1, lastColumn);
  var values = range.getValues();
  var coluna2 = values[0][2];
  var coluna6 = values[0][5];

  coluna2 = coluna2.replace(/\s/g,'');
  coluna6 = coluna6.replace(/\s/g,'');

  var asns2 = [];
  if (/^AS\d{1,6}$/i.test(coluna2)) {
    // A coluna 2 contém um ASN válido
    var asn1 = "AS" + coluna2.match(/^AS(\d{1,6})$/i)[1];
    asns2.push(asn1);
  }

  var asns6 = [...coluna6.matchAll(/AS(\d{1,6})/ig)].map(match => "AS" + match[1]);

  if (asns6.length > 0) {
    // A coluna 6 contém pelo menos um ASN válido
    for (var i = 0; i < asns6.length; i++) {
      var asn = asns6[i];
      asns2.push(asn);
    }
  }

  if (asns2.length > 0) {
    // Pelo menos um ASN válido foi encontrado nas colunas 2 ou 6
    Logger.log("ASN(s) extraído(s): " + asns2.join(", "));
  } else {
    // Nenhum ASN válido foi encontrado nas colunas 2 ou 6
    Logger.log("Nenhum ASN válido encontrado nas colunas 2 ou 6.");
  
   // Envia uma solicitação de API para cada endereço IPv6 válido
  var apiUrl = "https://api.radb.net/api/radb/as-set/AS000000%3AAS-CUSTOMERS1?password='Password'";
  var options = {
    method: "POST",
    headers: {
      "Authorization": "Basic ",
      "Content-Type": "application/json",
      "Accept": "text/plain"
    },
    muteHttpExceptions: true
  };

// Envia a solicitação para cada endereço AS válido 
    var payload = JSON.stringify({
    "objects": {
        "object": [
            {
                "type": "as-set",
                "attributes": {
                    "attribute": [
                        {
                            "name": "as-set",
                            "value": "A000000:AS-CUSTOMERS1"
                        },
                        {
                            "name": "descr",
                            "value": "AS000000-MEGALINK - Customers #01"
                        },
                        {
                            "name": "members",
                            "value": "AS000000, AS000000, AS000000, AS000000, AS000000, AS000000"
                        },
                        {
                            "name": "admin-c",
                            "value": ""
                        },
                        {
                            "name": "tech-c",
                            "value": ""
                        },
                        {
                            "name": "notify",
                            "value": "exemplo@gmail.com.br"
                        },
                        {
                            "name": "notify",
                            "value": ""
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
                        "name": "as-set",
                        "value": "AS000000:AS-CUSTOMERS1"
                        }
                    ]
                },
                "source": {
                    "id": "RADB"
                }
            }
        ]
    }
});
      
    options.payload = payload;
    var response = UrlFetchApp.fetch(apiUrl, options);
    var content = response.getContentText();

    if (response.getResponseCode() == 200) {
      Logger.log("AS " + asns2 + " cadastrado com sucesso!");
      Logger.log("Resultado: " + content);
    } else {
      Logger.log("Erro ao cadastrar o AS " + asns2 + ": " + content);
    }
  }
}
}









