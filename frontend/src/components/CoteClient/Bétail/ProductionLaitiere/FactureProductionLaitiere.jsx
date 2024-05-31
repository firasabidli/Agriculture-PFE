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
import { FcLeft } from "react-icons/fc";
import { Table } from "react-bootstrap";

const FactureProductionLaitiere = () => {
    const { user } = useUser();
    const userName = user?.nom;
    const { idAgriculteur, id, year, month } = useParams();
    const daysInMonth = new Date(year, month, 0).getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7);
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const weekDays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const daysOfWeek = weekDays.slice(firstDayOfMonth).concat(weekDays.slice(0, firstDayOfMonth));
    const [production, setProduction] = useState([]);
    const [prodTotal, setProdTotal] = useState(0);

    const printButtonRef = useRef(null);
    const exportButtonRef = useRef(null);

    const fetchProduction = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/ProductionBetail/${idAgriculteur}/${id}/${month}/${year}`);
            if (response.data != null) {
                setProduction(response.data.data);
                setProdTotal(response.data.productionTotal);
            }
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };

    useEffect(() => {
        if (idAgriculteur) {
            fetchProduction();
        }
    }, [idAgriculteur, id, year, month]);

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

            <div className="container px-0">
                <div className="row mt-4">
                    <div className="col-12 col-md-12">
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center text-150">
                                    <i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
                                    <span className="text-default-d3"><img className='logo' src={logo} alt="" /></span>
                                </div>
                            </div>
                        </div>
                        {production && (
                            <div>
                                <hr className="row brc-default-l1 mx-n1 mb-4" />
                                <div className="row">
                                    <div className="col-sm-6" style={{ fontSize: "100%" }}>
                                        <div>
                                            <span className="text-grey-m2 align-middle">Nom Vendeur:</span>
                                            <span className="text-600 text-110 text-blue align-middle"> {userName}</span>
                                        </div>
                                        <div className="text-grey-m2">
                                            <div className="my-1">Adresse:</div>
                                            <div className="my-1">{user?.adresse}</div>
                                            <div className="my-1"><FaPhoneAlt className="fa-flip-horizontal text-secondary" /> <b className="text-600">{user?.numeroTelephone}</b></div>
                                        </div>
                                    </div>
                                    <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                        <hr className="d-sm-none" />
                                        <div className="text-grey-m2">
                                            <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">Facture</div>
                                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">ID:</span> #111-222</div>
                                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Date:</span> Date</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 row" >
                                    <div className="col-12 col-md-12"></div>
                                    <table style={{  width: '100%' }}>
                                        <thead style={{textAlign:'center'}}>
                                            <tr style={{ backgroundColor: '#38c609', color: 'white' }}>
                                                <th>N° Semaine</th>
                                                {daysOfWeek.map((day, index) => (
                                                    <React.Fragment key={index}>
                                                        <th colSpan="3" style={{ border: 'solid 0.5px white' }}>{day}</th>
                                                    </React.Fragment>
                                                ))}
                                            </tr>
                                            <tr style={{ backgroundColor: '#38c609', color: 'white' }}>
                                                <th></th>
                                                {[...Array(daysOfWeek.length)].map((_, index) => (
                                                    <React.Fragment key={index}>
                                                        <th scope='col' style={{ border: 'solid 0.5px white' }}>quantité</th>
                                                        <th scope='col' style={{ border: 'solid 0.5px white' }}>prix</th>
                                                        <th scope="col" style={{ border: 'solid 0.5px white' }}>Total</th>
                                                    </React.Fragment>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(weeksInMonth)].map((_, semaineIndex) => (
                                                <tr key={semaineIndex} style={{textAlign:'center'}}>
                                                    <td style={{ border: 'solid white', color: 'grey' }}>{semaineIndex + 1}</td>
                                                    {[...Array(Math.min(7 * 3, (daysInMonth - semaineIndex * 7) * 3))].map((_, jourIndex) => {
                                                        const index = semaineIndex * 7 + Math.floor(jourIndex / 3);
                                                        const dayData = production[index];
                                                        const quantite = dayData ? dayData['quantite'] : '';
                                                        const prix = dayData ? dayData['prix'] : '';
                                                        const total = dayData['prix'] || dayData['quantite'] ? quantite * prix : '';
                                                        return (
                                                            <td key={jourIndex} style={{ border: 'solid 0.5px white', color: 'grey' }}>
                                                                {jourIndex % 3 === 2 ? total : jourIndex % 3 === 0 ? quantite : prix}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                            
                                        </tbody>
                                    </table>
                                    <b style={{textAlign:'right'}}>Production Total en DT: <span>{prodTotal}</span></b>
                                </div>
                            </div>
                        )}
                        <hr />
                        <div className="d-print-none mt-4">
                            <div className="float-end">
                                <button ref={printButtonRef} onClick={() => window.print()} className="btn bg-white btn-light mx-1px text-95" data-title="Print">
                                    <FiPrinter className="mr-1 text-primary-m1 text-120 w-2" />Imprimer
                                </button>
                                <button ref={exportButtonRef} className="btn bg-white btn-light mx-1px text-95" data-title="PDF" onClick={exportPDF}>
                                    <IoCloudDownloadOutline className="mr-1 text-primary-m1 text-120 w-2" />Exporter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    @media print {
                        table {
                            width: 100%;
                            font-size: 0.75em;
                        }
                        th, td {
                            padding: 4px;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default FactureProductionLaitiere;
