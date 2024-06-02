import React, { useEffect, useState, useRef } from "react";
import './Facture.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useUser } from '../../../UserContext';
import logo from "../../../../assets/images/logo1.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FiPrinter } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const FactureRecolte = () => {
    const { user } = useUser();
    const userName = user?.nom;
    const { id } = useParams();
    const [recolteData, setRecolteData] = useState(null);

    const printButtonRef = useRef(null);
    const exportButtonRef = useRef(null);

    useEffect(() => {
        const fetchRecoltData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/HistoriqueRecolte/recolte/${id}`);
                setRecolteData(response.data.Recoltes);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de la récolte:', error);
            }
        };

        if (id) {
            fetchRecoltData();
        }
    }, [id]);
// fonction pour afficher date 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
// exporter pdf
    const exportPDF = () => {
        const input = document.getElementById('invoice');

        // Masquer les boutons
        printButtonRef.current.style.display = 'none';
        exportButtonRef.current.style.display = 'none';

        html2canvas(input)
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgHeight = canvas.height * pdfWidth / canvas.width;
                
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }

                pdf.save(`facture_${id}.pdf`);

                // Réafficher les boutons
                printButtonRef.current.style.display = 'block';
                exportButtonRef.current.style.display = 'block';
            });
    };

    return (
        
        <div className="page-content container" id="invoice">
            <div className="page-header text-blue-d2">
                <h1 className="page-title text-secondary-d1">
                    Facture 
                    <small className="page-info">
                        <i className="fa fa-angle-double-right text-80"></i>
                    </small>
                </h1>
            </div>

            <div className="container px-0" >
                <div className="row mt-4">
                    <div className="col-12 col-lg-12">
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center text-150">
                                    <i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
                                    <span className="text-default-d3"><img className='logo' src={logo} alt=""/></span>
                                </div>
                            </div>
                        </div>
                        {recolteData && (
                            <div>
                                <hr className="row brc-default-l1 mx-n1 mb-4" />
                                <div className="row">
                                    <div className="col-sm-6" style={{fontSize:"100%"}}>
                                        <div>
                                            <span className=" text-grey-m2 align-middle" >Nom Vendeur:</span>
                                            <span className="text-600 text-110 text-blue align-middle"> {userName}</span>
                                        </div>
                                        <div className="text-grey-m2">
                                            <div className="my-1">Adresse:</div>
                                            <div className="my-1">{user?.adresse}</div>
                                            <div className="my-1"><FaPhoneAlt className="fa-flip-horizontal text-secondary"/> <b className="text-600">{user?.numeroTelephone}</b></div>
                                        </div>
                                    </div>
                                    <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                        <hr className="d-sm-none" />
                                        <div className="text-grey-m2">
                                            <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">Facture</div>
                                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">ID:</span> #111-222</div>
                                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Date:</span> {formatDate(recolteData.date)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="row text-600 text-white bgc-default-tp1 py-25">
                                        <div className="d-none d-sm-block col-1">#</div>
                                        <div className="col-9 col-sm-5" style={{ marginLeft: "15%" }}>Nombre * Quantite</div>
                                        <div className="d-none d-sm-block col-4 col-sm-2">prix de vente (DT)</div>
                                        <div className="d-none d-sm-block col-sm-2">prix Total Vente (DT)</div>
                                    </div>
                                    <div className="text-95 text-secondary-d3">
                                        {recolteData.balles.map((balle, index) => (
                                            <div className="row mb-2 mb-sm-0 py-25" key={index}>
                                                <div className="d-none d-sm-block col-1"style={{fontWeight:"bold"}}>Balles</div>
                                                <div className="col-9 col-sm-5" style={{ marginLeft: "15%" }}>{balle.nombreBalles}</div>
                                                <div className="d-none d-sm-block col-2">{balle.prixVenteParBalle}</div>
                                                <div className="d-none d-sm-block col-2 text-95">{balle.prixTotalBalle}</div>
                                            </div>
                                        ))}
                                        {recolteData.quantites.map((quantite, index) => (
                                            <div className="row mb-2 mb-sm-0 py-25 bgc-default-l4" key={index}>
                                                <div className="d-none d-sm-block col-1" style={{fontWeight:"bold"}}>Quantites</div>
                                                <div className="col-9 col-sm-5" style={{ marginLeft: "15%" }}>{quantite.quantite}{quantite.unite}</div>
                                                <div className="d-none d-sm-block col-2">{quantite.prix}</div>
                                                <div className="d-none d-sm-block col-2 text-95">{quantite.prixTotalVente}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="row border-b-2 brc-default-l2"></div>
                                    <div className="row mt-3">
                                        <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                            <div className="col-7 text-right" style={{fontWeight:"bold"}}>Total</div>
                                            <div className="col-5"><span className="text-150 text-success-d3 opacity-2">{recolteData.revenuTotal} DT</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr />
                        <div className="d-print-none mt-4">
                            <div className="float-end">
                                <button ref={printButtonRef} onClick={() => window.print()} className="btn bg-white btn-light mx-1px text-95" data-title="Print">
                                     <FiPrinter  className="mr-1 text-primary-m1 text-120 w-2"/>Imprimer
                                </button>
                                <button ref={exportButtonRef} className="btn bg-white btn-light mx-1px text-95" onClick={exportPDF} data-title="PDF">
                                    <IoCloudDownloadOutline className="mr-1 text-danger-m1 text-120 w-2"/> Télécharger
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FactureRecolte;
