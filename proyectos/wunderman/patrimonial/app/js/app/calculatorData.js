window.patCalData = {};
window.patCalData.PROFILES_NUMBER = 5;
window.patCalData.HISTORIC_BASE_INDEX_GLOBAL_MARKET= 0;
window.patCalData.HISTORIC_BASE_INDEX_CETES= 1;
window.patCalData.HISTORIC_BASE_INDEX_INFLATION= 2;
//Indice en eje X donde comienzan los valores tácticos
window.patCalData.valoresTacticosInit = 9;
window.patCalData.valoresTacticosMaximos = null;
window.patCalData.distribucionEstrategia = null;
window.patCalData.rendimientosPorPerfil = null;
window.patCalData.historico= null;
window.patCalData.calculoHistoricoPerfilActual= null;
window.patCalData.calculoHistorico= null;
//
window.patCalData.rendimientos= [["GOLD1+",2.49,9.78,15.60],["GOLD2+",3.59,13.34,22.37],["GOLD3+",4.43,16.55,25.81],["GOLD4+",5.14,18.88,30.62],["GOLD5+",5.92,21.07,35.40],["BNMDIN",2.66,10.18,15.05],["BNMIPC+",3.04,6.32,26.72],["BNMINT1",15.50,67.77,79.12],["BNMEM1",-0.20,6.65,15.26],["BNMPZO",3.06,11.67,20.22],["BNMREAL",0.80,10.62,18.33],["BNMPAT",2.97,11.00,39.80],["BNMEURV",14.52,43.65,72.60],["BNMUSEQ",20.51,93.41,102.61],["BNMASIA",5.63,26.08,47.83]];

window.patCalData.portafolioModelo= [["DCP","GOLD1+","P1",80.00,0.00,0.00,0.00,0.00],["GOLD2","GOLD2+","P2",0.00,70.00,0.00,0.00,0.00],["GOLD3","GOLD3+","P3",0.00,0.00,50.00,0.00,0.00],["GOLD4","GOLD4+","P4",0.00,0.00,0.00,50.00,0.00],["GOLD5","GOLD5+","P5",0.00,0.00,0.00,0.00,50.00],["DCP","BNMDIN","P1",20.00,10.00,8.00,6.00,2.00],["RVL","BNMIPC+","P3",0.00,0.00,8.00,0.00,0.00],["RVG","BNMINT1","P3",0.00,0.00,8.00,8.00,0.00],["RVEM","BNMEM1","P4",0.00,0.00,0.00,0.00,0.00],["DLP","BNMPZO","P2",0.00,10.00,7.00,8.00,4.00],["DTR","BNMREAL","P2",0.00,10.00,9.00,8.00,4.00],["RVL","BNMPAT","P3",0.00,0.00,0.00,8.00,10.00],["RVG","BNMEURV","P3",0.00,0.00,5.00,6.00,10.00],["RVG","BNMUSEQ","P3",0.00,0.00,0.00,0.00,10.00],["RVEM","BNMASIA","P4",0.00,0.00,5.00,6.00,10.00]];

window.patCalData.calculoHistoricoBase= [["MERCADO GLOBAL","CETES","INFLACIÓN"],[13.62,3.07,2.26],[65.60,10.47,10.67],[73.90,15.34,14.94]];

window.patCalData.historicoPorPerfil= [["","P1","P2","P3","P4","P5"],["12 MESES",2.52,3.17,5.20,5.72,7.53],["3 AÑOS",9.86,12.59,20.28,22.32,29.05],["4 AÑOS",15.49,21.02,31.66,36.04,45.83]];

window.patCalData.distribucionEstrategiaEtiquetas= [["DCP"],["DLP"],["DTR"],["RVL"],["RVG"],["RVEM"]];
window.patCalData.calculoClaseActivoBase= [["GOLD2"],["GOLD3"],["GOLD4"],["GOLD5"],["DCP"],["DLP"],["DTR"],["RVL"],["RVG"],["RVEM"]];

window.patCalData.calculoClaseActivoPortEstrategico= [[60.00,20.00,0.00,10.00,5.00,5.00],[40.00,20.00,0.00,20.00,10.00,10.00],[20.00,20.00,0.00,30.00,15.00,15.00],[5.00,15.00,0.00,40.00,20.00,20.00],[100.00,0.00,0.00,0.00,0.00,0.00],[0.00,100.00,0.00,0.00,0.00,0.00],[0.00,0.00,100.00,0.00,0.00,0.00],[0.00,0.00,0.00,100.00,0.00,0.00],[0.00,0.00,0.00,0.00,100.00,0.00],[0.00,0.00,0.00,0.00,0.00,100.00]];

window.patCalData.datos= [];

window.patCalData.DISCLAIMER = "1.   El valor de las acciones de Sociedades o Fondos de Inversión conlleva un riesgo de mercado incluyendo una posible minusvalía del capital invertido. Estos productos no están garantizados por Banamex/Accival o por alguna entidad integrante del Grupo Financiero Banamex o Citigroup, ni por ninguna entidad gubernamental. No existe ninguna garantía de que se cumplan las previsiones o las opiniones expresadas en este material. La información contenida en este material, no deberá interpretarse como asesoramiento de inversión. Rendimientos pasados, no garantizan desempeños futuros. Fuentes: IPC(Bloomberg). Impulsora de Fondos Banamex con datos de Bloomberg al 31 de diciembre de 2015 Se utilizaron series BNMDIN.BOB, GOLD1+.BOC,GOLD2+B1A, GOLD3+.B1C,GOLD4+.B1D y GOLD5+.B2A(Desempeño de los Portafolios Estratégicos GOLD+ Impulsora de Fondos Banamex, S.A de C.V 31/12/2014 al 31/12/2015)<br>Sociedades de Inversión de Renta Variable. Las operaciones de compraventa de acciones representativas del capital social de sociedades de inversión de renta variable están sujetas a cobro de comisión de corretaje. Los Prospectos de Información al Público Inversionista y Documentos con Información Clave para la Inversión de las Sociedades de Inversión se encuentran a su disposición para su consulta, análisis y conformidad en la página de Internet  www.fondosbanamex.com. Para cualquier pregunta que usted tenga, puede consultar a su Banquero Banamex, quien le explicará y proporcionará información sobre las distintas reservas en inversión, a fin de que usted seleccione la que más convenga a sus objetivos y necesidades.";
