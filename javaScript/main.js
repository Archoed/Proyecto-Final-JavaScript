const monedaOne = document.getElementById('moneda-uno')
const monedaTwo = document.getElementById('moneda-dos')
const cantidadOne = document.getElementById('cantidad-uno')
const cantidadTwo = document.getElementById('cantidad-dos')
const cambioTasa = document.getElementById('cambio')

// Fetch 

function calcular(){

    const moneda_uno = monedaOne.value;
    const moneda_dos = monedaTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_uno}`)
    .then(res => res.json())
    .then(data => {
       const tasa = data.rates[moneda_dos];
       cambioTasa.innerText =`1 ${moneda_uno} = ${tasa} ${moneda_dos}`

       cantidadTwo.value = (cantidadOne.value * tasa).toFixed(2);
    });

}


// Eventos 
monedaOne.addEventListener('change', calcular)
cantidadOne.addEventListener('input',calcular)
monedaTwo.addEventListener('change', calcular)
cantidadTwo.addEventListener('change',calcular)

tasa.addEventListener('click', ()=>{
    const temporal = monedaOne.value;
    monedaOne.value = monedaTwo.value;
    monedaTwo.value = temporal;
    calcular();
})


// Formulario tasas del dia 

class TasaCambio{
    constructor(compra,venta){
        this.compra = compra;
        this.venta = venta;
    }
}


const tasasDelDia ={
    Dolar: new TasaCambio(3.71, 3.74),
    Euros: new TasaCambio(3.99, 4.08),
    Yen: new TasaCambio(0.026, 0.033),
    PesoARS: new TasaCambio(0.0040, 0.0060),
    RealBRL: new TasaCambio(0.66, 0.89),
    PesoCLP: new TasaCambio(0.0040, 0.0062),
    YuanCNY: new TasaCambio(0.52, 0.71),
    PesoMEX: new TasaCambio(0.12, 0.19),
    PesoCOP: new TasaCambio(0.00075, 0.00090),
    Guarani: new TasaCambio(0.00041, 0.00049),
    PesoUYU: new TasaCambio(0.088, 0.092),
    Bolivar: new TasaCambio(0.000025, 0.000050)
};

function realizarTransaccion(){
    const tipoTransaccion = document.getElementById("tipoTransaccion").value;
    const moneda = document.getElementById("moneda").value;
    const monto = parseFloat(document.getElementById("monto").value);
    let maxMonto;

    if(moneda === "Dolar" || moneda === "Euros"){
        maxMonto = 5000;
    }else{
        maxMonto = 300000;
    }

    if(isNaN(monto) || monto<100 || monto >maxMonto){
        document.getElementById("resultadoInput").value = "Monto no disponible"
        return; 
    }

    let tasa; 
    if(tipoTransaccion === "compra"){
        tasa = tasasDelDia[moneda].compra;
    }else{
        tasa = tasasDelDia[moneda].venta;
    }

    const resultado = monto *tasa;

    const mensaje =`Tipo de Transacción: ${tipoTransaccion.charAt(0).toUpperCase() + tipoTransaccion.slice(1)}\n`+
                    `Moneda: ${moneda}\n`+
                    `Monto: ${monto}\n`+
                    `Total a ${tipoTransaccion === "compra" ? "pagar" : "recibir"}: S/ ${resultado.toFixed(2)}`;

                    document.getElementById("resultadoInput").value= mensaje;


                    setTimeout(() =>{
                        resultadoInput.value ='';
                        form.reset();
                    }, 7000);

}



// formulario cita 

document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('formulario_cita');
    const comprobanteCita = document.getElementById('comprobanteCita');

    function guardarCita(agendaCita){
        let citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas.push(agendaCita);
        localStorage.setItem('citas', JSON.stringify(citas));
    }

    function cargarCita(){
        let citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas.forEach(agendaCita => mostrarCita(agendaCita));
    }

    function mostrarCita(agendaCita) {
        const mensajeExitoso = `Cita Agendada exitosamente. Se enviará el comprobante a su correo electrónico.\n`;
        const citaText = `Nombre: ${agendaCita.name}\n` +
                         `Apellido: ${agendaCita.apellido}\n` +
                         `Fecha: ${agendaCita.date}\n` +
                         `Hora: ${agendaCita.time}\n` +
                         `Correo Electrónico: ${agendaCita.email}\n` +
                         `Sede: ${agendaCita.sede}\n`;
                         comprobanteCita.value = mensajeExitoso + citaText;
    }

    
    


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const apellido = document.getElementById('apellido').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const email = document.getElementById('email').value;
        const sede = document.getElementById('sede').value;

        const agendaCita = {
            name,
            apellido,
            date,
            time,
            email,
           sede
        };

    guardarCita(agendaCita);
    mostrarCita(agendaCita);

    setTimeout(() =>{
        comprobanteCita.value ='';
        form.reset();
    }, 7000);

  
});

    
});
document.getElementById('agendarBtn').addEventListener('click', function() {
    document.getElementById('contenedorCita').scrollIntoView({ behavior: 'smooth' });
});



calcular();