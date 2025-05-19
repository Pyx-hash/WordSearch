"use strict";














function WordSearchController(gameId, listId, solveId, newGameId, instructionsId, themeId) {


    var searchTypes = {
        "Math! (please don't run away)":
        [
        ["asymptote", "differential", "algorithm", "boolean"],
        ["euclidean", "integral", "logarithm", "matrix"],
        ["riemann", "polyhedron", "theta", "vector"],
        ["binomial", "pythagoras", "eccentricity", "unit circle"],
        ["derivative", "polar coordinates", "tangent", "scalene"]],

        "Astronomy and Physics!": [["circumpolar", "comet", "asteroid", "declination"],
			["earthshine", "albedo", "quantum", "olivine"], 
			["pyroxene", "decoherence", "fermion", "quark"],
			["gluon", "redshift", "inflaton", "planetesimal"],
			["anthropic", "exogenesis", "atom", "planck"]],

		"Philosophy!": [["metaphysics", "modus ponens", "modus tollens", "analogy"],
			["a priori", "a posteriori", "conditional", "nietzsche"],
			["diogenes", "paradox", "occam's razor", "causality"],
			["induction", "deduction", "ontology", "theology"],
			["syllogism", "ethics", "karl marx", "pluralism"]],

		"World Mythology 😃": [["chronos", "aether", "hypnos", "psyche"],
			["jupiter", "sol", "chaos", "pandora"],
			["thor", "valhalla", "amaterasu", "osiris"],
			["mazu", "izanami", "susanoo", "xipe totec"],
			["mercury", "bastet", "sekhmet", "ptah"]],

		"Shades of Purple!": [["violet", "periwinkle", "plum", "grape"],
			["orchid", "wine", "mauve", "lavender"],
			["lilac", "mulberry", "eggplant", "heliotrope"],
			["liseran purple", "amethyst", "fuchsia", "pomp and power"],
			["sangria", "boysenberry", "thistle", "heather"]],

		"The Many Different Flavors of Cat!": [["Russian Blue", "Siamese", "Persian", "Sphynx"],
			["Ragdoll", "Singapura", "Snowshoe", "Turkish Van"],
			["Maine Coon", "Devon Rex", "Charteux", "Scottish Fold"],
			["Himalayan", "Ragamuffin", "Bombay", "Siberian"],
			["Egyptian Mau", "Norwegian Forest Cat", "Abyssinian", "York Chocolate"]]
    };

    
    var game;
    var view;

    
    var mainInstuctions = "Search for the list of words inside the box and click-and-drag to select them!";


setUpWordSearch();




function setUpWordSearch() {

    var searchTypesArray = Object.keys(searchTypes);
    var randIndex = Math.floor(Math.random()*searchTypesArray.length);
    var listOfWords = searchTypes[searchTypesArray[randIndex]];
    convertToUpperCase(listOfWords);
    updateHeadings(mainInstuctions, searchTypesArray[randIndex]);
    game = new WordSearchLogic(gameId, listOfWords.slice());
    game.setUpGame();
    view = new WordSearchView(game.getMatrix(), game.getListOfWords(), gameId, listId, instructionsId);
    view.setUpView();
    view.triggerMouseDrag();
}















function convertToUpperCase(wordList) {
    for (var i = 0; i < wordList.length; i++) {
        for(var j = 0; j < wordList[i].length; j++){
            wordList[i][j] = wordList[i][j].toUpperCase();
        }
    }
}
function updateHeadings(instructions, theme) {
    $(instructionsId).text(instructions);
    $(themeId).text(theme);
}
$(solveId).click(function() {
    view.solve(game.getWordLocations(), game.getMatrix());
});
$(newGameId).click(function() {
    $(gameId).empty();
    $(listId).empty();
    $(themeId).empty();
    setUpWordSearch();
})
}