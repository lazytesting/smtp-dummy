function Cache() {
    this._cache = {};
    this.create = function(id, val) {
        this._cache[id] = val;
    };
    this.read = function(id) {
        return this._cache[id];
    };

    this.search = function(searchCriteria) {
        var results = JSON.parse(JSON.stringify( this._cache ));
        for(var criteria in searchCriteria)
        {
            results = filter(results, criteria, searchCriteria[criteria]);
        }
        return results;
    }

    this.delete = function(id) {
       delete this._cache[id];
    };
    this.clear = function() {
        this._cache ={};
    };

}

var filter = function(dataSet, prop, val) {
    for (var id in dataSet) {
        if (!dataSet.hasOwnProperty(id)) continue;
        for (var p in dataSet[id]) {
            if (p === prop && dataSet[id][p] !== val) {
                console.log('no hit');
                delete dataSet[id];
            }
        }
    }
    return dataSet;
};


module.exports = Cache;






