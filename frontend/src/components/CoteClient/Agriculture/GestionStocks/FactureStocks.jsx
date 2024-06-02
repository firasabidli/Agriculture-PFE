import React,{useEffect,useState,useRef} from "react";
import './FactureStocks.css';
import { useParams } from "react-router-dom";
import { useUser } from '../../../UserContext';
import axios from "axios";
import jsPDF from 'jspdf';
import { Link } from "react-router-dom";
import html2canvas from 'html2canvas';
import { FiPrinter } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5"
const FactureStocks=()=>{
    const { user } = useUser();
    const userName = user?.nom;
    const { id } = useParams();
    const [formData, setFormData] = useState([])
    const printButtonRef = useRef(null);
    const exportButtonRef = useRef(null);
    useEffect(() => {
        const fetchStock = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/GestionStocks/stock/${id}`);
            const stockData = response.data.stocks;
    console.log("ss",stockData)
            setFormData({
              libellé: stockData.libellé,
              date: formatDate(stockData.date),
              entrées: stockData.entrées,
              sortie: stockData.sortie,
              emplacement: stockData.emplacement,
              ville: stockData.ville,
              typeStocks: stockData.typeStocks
            });
          } catch (error) {
            console.error('Error fetching stock:', error);
          }
        };
    
        if (id) {
          fetchStock();
        }
      }, [id]);
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      let totalPrixSorties = 0;
      if (formData.sortie && Array.isArray(formData.sortie)) {
        formData.sortie.forEach((sortie, index) => {
            totalPrixSorties += parseFloat(sortie.prix) * parseFloat(sortie.quantitéSortie);
        });
    }
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
    return(
        <div class="container bootdey" id="invoice">
         <div class="row">
		<div class="col-sm-10 col-sm-offset-1">
            {formData && (
			<div class="widget-box">
				<div class="widget-header widget-header-large">
					<h3 class="widget-title grey lighter">
						<i class="ace-icon fa fa-leaf green"></i>
						Facture
					</h3>

					<div class="widget-toolbar no-border invoice-info">
						<span class="invoice-info-label">Facture:</span>
						<span class="red">#121212</span>

						<br/>
						<span class="invoice-info-label">Date:</span>
						<span class="blue">{formData.date}</span>
					</div>

					<div class="widget-toolbar hidden-480">
						<Link >
							<i class="ace-icon fa fa-print"></i>
						</Link>
					</div>
				</div>

				<div class="widget-body">
					<div class="widget-main padding-24">
						<div class="row">
							<div class="col-sm-6">
								<div class="row">
									<div class="col-xs-11 label label-lg label-info arrowed-in arrowed-right">
										<b>Informations sur Vendeur</b>
									</div>
								</div>

								<div>
									<ul class="list-unstyled spaced">
										<li>
											<i class="ace-icon fa fa-caret-right blue"></i>{userName}
										</li>

										<li>
											<i class="ace-icon fa fa-caret-right blue"></i>{user?.adresse}
										</li>

										<li>
											
											<b class="red">{user?.numeroTelephone}</b>
										</li>

										<li class="divider"></li>
									</ul>
								</div>
							</div>

							<div class="col-sm-6">
								<div class="row">
									<div class="col-xs-11 label label-lg label-success arrowed-in arrowed-right">
										<b>Informations sur Client</b>
									</div>
								</div>
                                {Array.isArray(formData.sortie) && formData.sortie.map((sort, index) => (
								<div>
									<ul class="list-unstyled  spaced">
										<li>
											<i class="ace-icon fa fa-caret-right green">{sort.nomClient}</i>
										</li>

										<li>
											<i class="ace-icon fa fa-caret-right green"></i>{sort.adresseClient}
										</li>
									</ul>
								</div>
                                ))}
							</div>
						</div>

						<div class="space">Nom de produit: <span style={{fontWeight:"bold"}}>{formData.libellé}</span></div>

						<div>
							<table class="table table-striped table-bordered">
								<thead>
									<tr>
										<th class="center">#</th>
										<th>Quantité</th>
										<th class="hidden-xs">prix</th>
									</tr>
								</thead>

								<tbody>
                                {Array.isArray(formData.sortie) && formData.sortie.map((sort, index) => (
									<tr>
										<td class="center">{index}</td>

										<td>
											<Link >{sort.quantitéSortie}{sort.uniteSortie}</Link>
										</td>
										<td class="hidden-xs">
                                        {sort.prix}
										</td>
										
									</tr>
                                ))}
								</tbody>
							</table>
						</div>

						<div class="hr hr8 hr-double hr-dotted"></div>

						<div class="row">
							<div class="col-sm-5 pull-right">
								<h4 class="pull-right">
									Total :
									<span class="red">{totalPrixSorties} DT</span>
								</h4>
							</div>
							
						</div>
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
						<div class="space-6"></div>
                       
					</div>
				</div>
			</div>
            )}
		</div>
	</div>
</div>
    )
}
export default FactureStocks