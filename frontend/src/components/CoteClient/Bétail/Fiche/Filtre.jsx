import React from 'react';

const Filtre = ({ onCategoryChange }) => {
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    onCategoryChange(category); // Appel de la fonction de filtrage avec la catégorie sélectionnée
  };

  return (
    <div className="row text-left mb-5" style={{ marginLeft: "14%" }}>
      <div className="col-lg-6 mb-3 mb-sm-0" style={{ width: "30%" }}>
        <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50">
          <select
            className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50"
            data-toggle="select"
            tabIndex="-98"
            onChange={handleCategoryChange}
          >
            <option value="">Categories</option>
            <option value="bovin">Bovin</option>
            <option value="ovin">Ovin</option>
            <option value="volailles">Volailles</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6 text-lg-right" style={{ width: "30%" }}>
        <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50">
          <select
            className="form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50"
            data-toggle="select"
            tabIndex="-98"
          >
            <option value="">Filter by</option>
            <option value="Race">Race</option>
            <option value="Naissance">Naissance</option>
            <option value="SubCtegorie">SubCtegorie</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filtre;
