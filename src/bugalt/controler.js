import Bugalt from "./model";

const bugaltControler = {
    async get(req, res) {
        try {
           
            const list = await Bugalt.find(makeQueryObject (req.query));            
            res.send(list);
        } catch (error) {
            res.status(500).send(error);
        }


        function makeQueryObject(query){
            let result = {};        
            if (query.posada)
                result.$expr = { "$eq": query.posada} ;

            if (query.countOfChilds){
                result.pages = {"$lte": parseInt(query.countOfChilds)};
            }
            
            return result;
        }
    },
    async getById(req, res) {
        try {
            const bugalt = await Bugalt.findById(req.params.id);
            if (!bugalt)
                res.status(404).send("Not found");
            res.send(bugalt);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    async post (req, res) {
        try {           
            const bugalt = new Bugalt(req.body);
            await bugalt.save();
            res.send(bugalt);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const bugalt = await Bugalt.findByIdAndDelete(req.params.id);
            if (!bugalt)
                res.status(404).send("Not found");
            res.send(bugalt);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async patch(req, res) {
        try {
            const bugalt = await Bugalt.findByIdAndUpdate(req.params.id, req.body, {new: true}) ;
            if (!bugalt)
                res.status(404).send("Not found");
            await bugalt.save();  
            res.send(bugalt);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default bugaltControler;