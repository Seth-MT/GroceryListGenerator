const Food = require('../models/foodbookModel');

createCatalogue = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No entry provided',
        });
    }

    const food = new Food(body);

    if (!food) {
        return res.status(400).json({ success: false, error: err });
    }

    food
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                message: 'Entry Added!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Couldn't Add Entry",
            });
        })
}	

loadCatalogue = async (req, res) => {
    await Food.find({}, (err, catalogue) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!catalogue.length) {
            return res
                .status(404)
                .json({ success: false, error: `Catalogue Empty` });
        }
		
		
		let outputList = catalogue.filter((catalogue, index, self) =>
			index === self.findIndex((t) => (t.save === catalogue.save && t.name === catalogue.name)))
		
		outputList = outputList.sort();
		
        return res.status(200).json({ success: true, data: outputList });
    }).catch(err => console.log(err))
}




module.exports = {
    createCatalogue,
	loadCatalogue,
}