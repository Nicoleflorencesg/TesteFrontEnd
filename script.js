function openNav() {
      document.getElementById("mySidenav").style.width = "97%";
      document.getElementById("iconeMenu").style.display="none";
      document.getElementById("iconeMapa").style.display="inline";
      document.getElementById("iconeTresPontos").style.display="inline";                                    
}

function closeNav() {
	 document.getElementById("mySidenav").style.width = "0";
     document.getElementById("iconeMapa").style.display="none";
     document.getElementById("iconeMenu").style.display="inline";
     document.getElementById("iconeTresPontos").style.display="inline";                                
}

function novoCliente() {
	 document.getElementById("formulario").style.display = "inline";
     document.getElementById("botaoCancelar").style.display = "inline";   
     document.getElementById("clientes").style.display = "none";                                
}

function cancelar(){
    document.getElementById("formulario").style.display = "none";
    document.getElementById("botaoCancelar").style.display = "none";  
    document.getElementById("clientes").style.display = "inline";                              
}                            

function initMap() {
    document.getElementById("clientes").style.display = "inline";                                
    document.getElementById("formulario").style.display = "none";                                
    document.getElementById("botaoCancelar").style.display = "none";  
    carregarPontos();
}
         
                         
function carregarPontos(){

     $.ajax({

            type: "GET",
            url: "http://app.digicade-hml.com.br/frontend-api/clientes",
            contentType:"application/json",
            success: function(data) {

                this.qtd = data._embedded.clientes.length;
               
                for (i = 0; i < this.qtd; i++){

                    this.cliente =  data._embedded.clientes[i];

                     var tr = '<tr>'+
                    '<td class="fontLista">' +  '<a onclick="preencheForm(this.cliente)">' + data._embedded.clientes[i].nome + '</a>' +  '</td>' +
                    '<td class="fontLista">' + data._embedded.clientes[i].telefone + '</td>' +
                    '<td class="fontLista">' +  '<a onclick="deletaCliente(this.cliente)">' + '<i class="fa fa-close" aria-hidden="true"></i>' + '</a>' +  '</td>' +
                                       
                    '</tr>'
                    $('#grid').find('tbody').append( tr );

                }

                var uluru = {lat: data._embedded.clientes[0].latitude, lng:data._embedded.clientes[0].longitude}
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 4,
                    center: uluru
                });

                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });

                $.each(data._embedded.clientes, function(index, ponto) {
                       var marker = new google.maps.Marker({
                           position: new google.maps.LatLng({lat: ponto.latitude, lng:ponto.longitude}),
                                    map: map
                            });
                       });
                }
     });                                                              
                           
}  

function deletaCliente(cliente) { /* não consegui passar o cliente como parametro para pegar a url que continha seu id 
                                    de toda forma deixo abaixo como ficaria a requisição */

     console.log('delete',cliente);

/*     $.ajax({

            type: "DELETE",
            url: cliente._links.cliente.href,
            contentType:"application/json",
            success: function(data) {
                console.log('data',data);
            }
     });*/

}


function preencheForm(cliente) {
     console.log('prenche',this.cliente);

/* Conforme tabela apresentada no código acima, eu consegui fazer a chamada da função, 
mas nao consegui passar o cliente selecionado como parâmetro. Sendo assim, não consegui finalizar a funcionalidade de put.
De toda forma deixei comentado abaixo como ficaria a chamada da requesição, a meu ver é o ponto principal dessa
tarefa. */

/*
    $.ajax({
                        type: "PUT",
                        url: cliente._links.cliente.href,
                        data    : JSON.stringify(form),
                        contentType:"application/json",
                        dataType: "json",
                        success: function(data) {
                            alert('Registro atualizado com sucesso');
                       }
            }); 
*/

}    
        

 
                           
                                 