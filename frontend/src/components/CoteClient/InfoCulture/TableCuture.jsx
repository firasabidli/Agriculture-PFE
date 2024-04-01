import Table from 'react-bootstrap/Table';
const TableCulture = ({ cultureData }) => {
  console.log("table",cultureData)
  // if (!cultureData || cultureData.length === 0 || !Array.isArray(cultureData)) {
  //   return <p>Aucune donnée à afficher.</p>;
  // }

  
  return (
    <article class="blog-post" style={{ marginLeft: "5%", marginTop: "2%" }}>
      <h2 class="blog-post-title mb-1">Planification et Suivi Agricole</h2>
      <p class="blog-post-meta"> </p>
      <p>Gestion efficace des cultures : planification et suivi.</p>
      <h3>Tableau d'exemple</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr >
            <th style={{color:"black",backgroundColor:"white"}}>date_plantation</th>
            <th style={{color:"black",backgroundColor:"white"}}>date_recolte</th>
            <th style={{color:"black",backgroundColor:"white"}}>methode_Irrigation</th>
            <th style={{color:"black",backgroundColor:"white"}}>quantite_eau_Irrigation</th>
            <th style={{color:"black",backgroundColor:"white"}}>frequence_Surveillance</th>
            <th style={{color:"black",backgroundColor:"white"}}>date_dernier_Surveillance</th>
          </tr>
        </thead>
        <tbody>
          {cultureData && (
            <tr >
              <td>{cultureData.date_plantation}</td>
              <td>{cultureData.date_recolte}</td>
              <td>{cultureData.methode_irrigation}</td>
              <td>{cultureData.quantite_eau_irrigation}</td>
              <td>{cultureData.frequence_surveillance}</td>
              <td>{cultureData.date_derniere_surveillance}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <p>Découvrez comment une planification minutieuse et un suivi rigoureux peuvent optimiser votre activité agricole.</p>
    </article>
  );
}
export default TableCulture;
