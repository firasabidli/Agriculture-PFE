import React, { useState } from 'react';

const Filtre = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory(''); 
    onFilterChange(category, '');
  };

  const handleSubcategoryChange = (event) => {
    const subcategory = event.target.value;
   
    setSelectedSubcategory(subcategory);
    onFilterChange(selectedCategory, subcategory);
  };

  return (
    <div className="row text-left mb-5" style={{ marginLeft: "14%" }}>
      <div className="col-lg-6 mb-3 mb-sm-0" style={{ width: "30%" }}>
        <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50">
          <select
            className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50"
            data-toggle="select"
            tabIndex="-98"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Catégories</option>
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
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
          >
            <option value="">Sous-catégories</option>
            {/* Remplacez ces options par les sous-catégories réelles correspondant à la catégorie sélectionnée */}
            {selectedCategory === 'bovin' && (
              <>
                <option value="Vache">Vache</option>
                <option value="Taureau">Taureau</option>
              </>
            )}
            {selectedCategory === 'ovin' && (
              <>
                <option value="Mouton">Mouton</option>
                <option value="Chèvre">Chèvre</option>
              </>
            )}
            {selectedCategory === 'volailles' && (
              <>
                <option value="Poulet">Poulet</option>
                <option value="Dinde">Dinde</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filtre;
