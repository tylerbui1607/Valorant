module.exports = {
    cvDataToObjects : (array) =>{
        //return array.map(array=> array.toObject());
        return array.map(function(product, index){
            var rs = product.toObject();
            rs.id = index +1;
            return rs;
        });

    },
    cvDataToObject : (data) =>{
        return data ? data.toObject() : data;
    }
};
