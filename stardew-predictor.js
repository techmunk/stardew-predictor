/* stardew-predictor.js
 * https://mouseypounds.github.io/stardew-predictor/
 */

/*jshint browser: true, jquery: true, esnext: true */

(function ($) {
    $.QueryString = (function (a) {
        var i,
            p,
            b = {};
        if (a === "") { return {}; }
        for (i = 0; i < a.length; i += 1) {
            p = a[i].split('=');
            if (p.length === 2) {
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
        }
        return b;
    }(window.location.search.substr(1).split('&')));
}(jQuery));

window.onload = function () {
	"use strict";

	// Check for required File API support.
	if (!(window.File && window.FileReader)) {
		document.getElementById('out-summary').innerHTML = '<span class="error">Fatal Error: Could not load the File & FileReader APIs</span>';
		return;
	}

	// "Global" var to cache save info.
	var save = {};
	// Although this stuff isn't really part of the save file, it's a good place to put it so that
	// all the tab functions have access. Some of this could be condensed via some looping, I'm sure.
	// Most of this comes from Data\ObjectInformation.xnb, some from Data\FurnitureInformation.xnb
	save.seasonNames = ['Spring', 'Summer', 'Fall', 'Winter'];
	save.cartItems = {
		789: 'Wild Horseradish',
		788: 'Wild Horseradish',
		787: 'Wild Horseradish',
		786: 'Battery Pack',
		785: 'Battery Pack',
		784: 'Battery Pack',
		783: 'Battery Pack',
		782: 'Battery Pack',
		781: 'Battery Pack',
		780: 'Battery Pack',
		779: 'Battery Pack',
		778: 'Battery Pack',
		777: 'Battery Pack',
		776: 'Battery Pack',
		775: 'Battery Pack',
		774: 'Battery Pack',
		773: 'Battery Pack',
		772: 'Life Elixir',
		771: 'Oil of Garlic',
		770: 'Fiber',
		769: 'Fiber',
		768: 'Void Essence',
		767: 'Solar Essence',
		766: 'Bat Wing',
		765: 'Slime',
		764: 'Slime',
		763: 'Slime',
		762: 'Slime',
		761: 'Slime',
		760: 'Slime',
		759: 'Slime',
		758: 'Slime',
		757: 'Slime',
		756: 'Slime',
		755: 'Slime',
		754: 'Slime',
		753: 'Slime',
		752: 'Slime',
		751: 'Slime',
		750: 'Slime',
		749: 'Slime',
		748: 'Slime',
		747: 'Slime',
		746: 'Slime',
		745: 'Slime',
		744: 'Slime',
		743: 'Slime',
		742: 'Slime',
		741: 'Slime',
		740: 'Slime',
		739: 'Slime',
		738: 'Slime',
		737: 'Slime',
		736: 'Slime',
		735: 'Slime',
		734: 'Slime',
		733: 'Woodskip',
		732: 'Woodskip',
		731: 'Crab Cakes',
		730: 'Maple Bar',
		729: 'Lobster Bisque',
		728: 'Escargot',
		727: 'Fish Stew',
		726: 'Chowder',
		725: 'Pine Tar',
		724: 'Oak Resin',
		723: 'Maple Syrup',
		722: 'Oyster',
		721: 'Periwinkle',
		720: 'Snail',
		719: 'Shrimp',
		718: 'Mussel',
		717: 'Cockle',
		716: 'Crab',
		715: 'Crayfish',
		714: 'Lobster',
		713: 'Lobster',
		712: 'Lobster',
		711: 'Lobster',
		710: 'Lobster',
		709: 'Lobster',
		708: 'Hardwood',
		707: 'Halibut',
		706: 'Lingcod',
		705: 'Shad',
		704: 'Albacore',
		703: 'Dorado',
		702: 'Magnet',
		701: 'Chub',
		700: 'Tilapia',
		699: 'Bullhead',
		698: 'Tiger Trout',
		697: 'Sturgeon',
		696: 'Sturgeon',
		695: 'Sturgeon',
		694: 'Cork Bobber',
		693: 'Trap Bobber',
		692: 'Treasure Hunter',
		691: 'Lead Bobber',
		690: 'Barbed Hook',
		689: 'Barbed Hook',
		688: 'Barbed Hook',
		687: 'Barbed Hook',
		686: 'Dressed Spinner',
		685: 'Spinner',
		684: 'Bait',
		683: 'Bug Meat',
		682: 'Bug Meat',
		681: 'Bug Meat',
		680: 'Bug Meat',
		679: 'Bug Meat',
		678: 'Bug Meat',
		677: 'Bug Meat',
		676: 'Bug Meat',
		675: 'Bug Meat',
		674: 'Bug Meat',
		673: 'Bug Meat',
		672: 'Bug Meat',
		671: 'Bug Meat',
		670: 'Bug Meat',
		669: 'Bug Meat',
		668: 'Bug Meat',
		667: 'Bug Meat',
		666: 'Bug Meat',
		665: 'Bug Meat',
		664: 'Bug Meat',
		663: 'Bug Meat',
		662: 'Bug Meat',
		661: 'Bug Meat',
		660: 'Bug Meat',
		659: 'Bug Meat',
		658: 'Bug Meat',
		657: 'Bug Meat',
		656: 'Bug Meat',
		655: 'Bug Meat',
		654: 'Bug Meat',
		653: 'Bug Meat',
		652: 'Bug Meat',
		651: 'Bug Meat',
		650: 'Poppyseed Muffin',
		649: 'Poppyseed Muffin',
		648: 'Fiddlehead Risotto',
		647: 'Coleslaw',
		646: 'Coleslaw',
		645: 'Coleslaw',
		644: 'Coleslaw',
		643: 'Coleslaw',
		642: 'Coleslaw',
		641: 'Coleslaw',
		640: 'Coleslaw',
		639: 'Coleslaw',
		638: 'Coleslaw',
		637: 'Cherry',
		636: 'Pomegranate',
		635: 'Peach',
		634: 'Orange',
		633: 'Apricot',
		632: 'Apple Sapling',
		631: 'Pomegranate Sapling',
		630: 'Peach Sapling',
		629: 'Orange Sapling',
		628: 'Apricot Sapling',
		627: 'Cherry Sapling',
		626: 'Cherry Sapling',
		625: 'Cherry Sapling',
		624: 'Cherry Sapling',
		623: 'Cherry Sapling',
		622: 'Cherry Sapling',
		621: 'Cherry Sapling',
		620: 'Quality Sprinkler',
		619: 'Quality Sprinkler',
		618: 'Quality Sprinkler',
		617: 'Bruschetta',
		616: 'Bruschetta',
		615: 'Bruschetta',
		614: 'Bruschetta',
		613: 'Bruschetta',
		612: 'Apple',
		611: 'Cranberry Candy',
		610: 'Blackberry Cobbler',
		609: 'Fruit Salad',
		608: 'Radish Salad',
		607: 'Pumpkin Pie',
		606: 'Roasted Hazelnuts',
		605: 'Stir Fry',
		604: 'Artichoke Dip',
		603: 'Plum Pudding',
		602: 'Plum Pudding',
		601: 'Plum Pudding',
		600: 'Plum Pudding',
		599: 'Plum Pudding',
		598: 'Sprinkler',
		597: 'Sprinkler',
		596: 'Blue Jazz',
		595: 'Blue Jazz',
		594: 'Fairy Rose',
		593: 'Fairy Rose',
		592: 'Summer Spangle',
		591: 'Summer Spangle',
		590: 'Tulip',
		589: 'Tulip',
		588: 'Tulip',
		587: 'Tulip',
		586: 'Tulip',
		585: 'Tulip',
		584: 'Tulip',
		583: 'Tulip',
		582: 'Tulip',
		581: 'Tulip',
		580: 'Tulip',
		579: 'Tulip',
		578: 'Tulip',
		577: 'Tulip',
		576: 'Tulip',
		575: 'Tulip',
		574: 'Tulip',
		573: 'Tulip',
		572: 'Tulip',
		571: 'Tulip',
		570: 'Tulip',
		569: 'Tulip',
		568: 'Tulip',
		567: 'Tulip',
		566: 'Tulip',
		565: 'Tulip',
		564: 'Tulip',
		563: 'Tulip',
		562: 'Tulip',
		561: 'Tulip',
		560: 'Tulip',
		559: 'Tulip',
		558: 'Tulip',
		557: 'Tulip',
		556: 'Tulip',
		555: 'Tulip',
		554: 'Tulip',
		553: 'Tulip',
		552: 'Tulip',
		551: 'Tulip',
		550: 'Tulip',
		549: 'Tulip',
		548: 'Tulip',
		547: 'Tulip',
		546: 'Tulip',
		545: 'Tulip',
		544: 'Tulip',
		543: 'Tulip',
		542: 'Tulip',
		541: 'Tulip',
		540: 'Tulip',
		539: 'Tulip',
		538: 'Tulip',
		537: 'Tulip',
		536: 'Tulip',
		535: 'Tulip',
		534: 'Tulip',
		533: 'Tulip',
		532: 'Tulip',
		531: 'Tulip',
		530: 'Tulip',
		529: 'Tulip',
		528: 'Tulip',
		527: 'Tulip',
		526: 'Tulip',
		525: 'Tulip',
		524: 'Tulip',
		523: 'Tulip',
		522: 'Tulip',
		521: 'Tulip',
		520: 'Tulip',
		519: 'Tulip',
		518: 'Tulip',
		517: 'Tulip',
		516: 'Tulip',
		515: 'Tulip',
		514: 'Tulip',
		513: 'Tulip',
		512: 'Tulip',
		511: 'Tulip',
		510: 'Tulip',
		509: 'Tulip',
		508: 'Tulip',
		507: 'Tulip',
		506: 'Tulip',
		505: 'Tulip',
		504: 'Tulip',
		503: 'Tulip',
		502: 'Tulip',
		501: 'Tulip',
		500: 'Tulip',
		499: 'Tulip',
		498: 'Ancient Seeds',
		497: 'Winter Seeds',
		496: 'Fall Seeds',
		495: 'Summer Seeds',
		494: 'Spring Seeds',
		493: 'Beet Seeds',
		492: 'Cranberry Seeds',
		491: 'Yam Seeds',
		490: 'Bok Choy Seeds',
		489: 'Pumpkin Seeds',
		488: 'Artichoke Seeds',
		487: 'Eggplant Seeds',
		486: 'Corn Seeds',
		485: 'Starfruit Seeds',
		484: 'Red Cabbage Seeds',
		483: 'Radish Seeds',
		482: 'Wheat Seeds',
		481: 'Pepper Seeds',
		480: 'Blueberry Seeds',
		479: 'Tomato Seeds',
		478: 'Melon Seeds',
		477: 'Rhubarb Seeds',
		476: 'Kale Seeds',
		475: 'Garlic Seeds',
		474: 'Potato Seeds',
		473: 'Cauliflower Seeds',
		472: 'Bean Starter',
		471: 'Parsnip Seeds',
		470: 'Parsnip Seeds',
		469: 'Parsnip Seeds',
		468: 'Parsnip Seeds',
		467: 'Parsnip Seeds',
		466: 'Parsnip Seeds',
		465: 'Deluxe Speed-Gro',
		464: 'Speed-Gro',
		463: 'Speed-Gro',
		462: 'Speed-Gro',
		461: 'Speed-Gro',
		460: 'Speed-Gro',
		459: 'Speed-Gro',
		458: 'Mead',
		457: 'Mead',
		456: 'Pale Broth',
		455: 'Algae Soup',
		454: 'Spangle Seeds',
		453: 'Spangle Seeds',
		452: 'Poppy Seeds',
		451: 'Poppy Seeds',
		450: 'Poppy Seeds',
		449: 'Poppy Seeds',
		448: 'Poppy Seeds',
		447: 'Poppy Seeds',
		446: 'Poppy Seeds',
		445: 'Rabbit\'s Foot',
		444: 'Rabbit\'s Foot',
		443: 'Duck Feather',
		442: 'Duck Feather',
		441: 'Duck Egg',
		440: 'Duck Egg',
		439: 'Wool',
		438: 'Wool',
		437: 'L. Goat Milk',
		436: 'L. Goat Milk',
		435: 'Goat Milk',
		434: 'Goat Milk',
		433: 'Goat Milk',
		432: 'Coffee Bean',
		431: 'Truffle Oil',
		430: 'Sunflower Seeds',
		429: 'Truffle',
		428: 'Jazz Seeds',
		427: 'Cloth',
		426: 'Tulip Bulb',
		425: 'Goat Cheese',
		424: 'Fairy Seeds',
		423: 'Cheese',
		422: 'Cheese',
		421: 'Purple Mushroom',
		420: 'Sunflower',
		419: 'Red Mushroom',
		418: 'Red Mushroom',
		417: 'Crocus',
		416: 'Sweet Gem Berry',
		415: 'Snow Yam',
		414: 'Stepping Stone Path',
		413: 'Crystal Fruit',
		412: 'Crystal Fruit',
		411: 'Winter Root',
		410: 'Cobblestone Path',
		409: 'Blackberry',
		408: 'Crystal Path',
		407: 'Hazelnut',
		406: 'Gravel Path',
		405: 'Wild Plum',
		404: 'Wood Path',
		403: 'Common Mushroom',
		402: 'Common Mushroom',
		401: 'Sweet Pea',
		400: 'Straw Floor',
		399: 'Strawberry',
		398: 'Spring Onion',
		397: 'Grape',
		396: 'Sea Urchin',
		395: 'Spice Berry',
		394: 'Spice Berry',
		393: 'Rainbow Shell',
		392: 'Coral',
		391: 'Nautilus Shell',
		390: 'Nautilus Shell',
		389: 'Stone',
		388: 'Stone',
		387: 'Wood',
		386: 'Wood',
		385: 'Iridium Ore',
		384: 'Iridium Ore',
		383: 'Gold Ore',
		382: 'Gold Ore',
		381: 'Coal',
		380: 'Coal',
		379: 'Iron Ore',
		378: 'Iron Ore',
		377: 'Copper Ore',
		376: 'Copper Ore',
		375: 'Poppy',
		374: 'Poppy',
		373: 'Poppy',
		372: 'Poppy',
		371: 'Clam',
		370: 'Quality Retaining Soil',
		369: 'Basic Retaining Soil',
		368: 'Quality Fertilizer',
		367: 'Basic Fertilizer',
		366: 'Basic Fertilizer',
		365: 'Basic Fertilizer',
		364: 'Basic Fertilizer',
		363: 'Basic Fertilizer',
		362: 'Basic Fertilizer',
		361: 'Basic Fertilizer',
		360: 'Basic Fertilizer',
		359: 'Basic Fertilizer',
		358: 'Basic Fertilizer',
		357: 'Basic Fertilizer',
		356: 'Basic Fertilizer',
		355: 'Basic Fertilizer',
		354: 'Basic Fertilizer',
		353: 'Basic Fertilizer',
		352: 'Basic Fertilizer',
		351: 'Basic Fertilizer',
		350: 'Basic Fertilizer',
		349: 'Juice',
		348: 'Juice',
		347: 'Wine',
		346: 'Rare Seed',
		345: 'Beer',
		344: 'Beer',
		343: 'Jelly',
		342: 'Jelly',
		341: 'Pickles',
		340: 'Pickles',
		339: 'Honey',
		338: 'Honey',
		337: 'Refined Quartz',
		336: 'Iridium Bar',
		335: 'Gold Bar',
		334: 'Iron Bar',
		333: 'Copper Bar',
		332: 'Crystal Floor',
		331: 'Crystal Floor',
		330: 'Weathered Floor',
		329: 'Clay',
		328: 'Stone Floor',
		327: 'Wood Floor',
		326: 'Wood Floor',
		325: 'Wood Floor',
		324: 'Gate',
		323: 'Iron Fence',
		322: 'Stone Fence',
		321: 'Wood Fence',
		320: 'Wood Fence',
		319: 'Wood Fence',
		318: 'Wood Fence',
		317: 'Wood Fence',
		316: 'Wood Fence',
		315: 'Wood Fence',
		314: 'Wood Fence',
		313: 'Wood Fence',
		312: 'Wood Fence',
		311: 'Wood Fence',
		310: 'Pine Cone',
		309: 'Maple Seed',
		308: 'Acorn',
		307: 'Void Mayonnaise',
		306: 'Duck Mayonnaise',
		305: 'Mayonnaise',
		304: 'Void Egg',
		303: 'Hops',
		302: 'Pale Ale',
		301: 'Hops Starter',
		300: 'Grape Starter',
		299: 'Amaranth',
		298: 'Amaranth Seeds',
		297: 'Hardwood Fence',
		296: 'Hardwood Fence',
		295: 'Salmonberry',
		294: 'Salmonberry',
		293: 'Salmonberry',
		292: 'Salmonberry',
		291: 'Salmonberry',
		290: 'Salmonberry',
		289: 'Salmonberry',
		288: 'Salmonberry',
		287: 'Mega Bomb',
		286: 'Bomb',
		285: 'Cherry Bomb',
		284: 'Cherry Bomb',
		283: 'Beet',
		282: 'Holly',
		281: 'Cranberries',
		280: 'Chanterelle',
		279: 'Yam',
		278: 'Yam',
		277: 'Bok Choy',
		276: 'Bok Choy',
		275: 'Pumpkin',
		274: 'Pumpkin',
		273: 'Artichoke',
		272: 'Artichoke',
		271: 'Eggplant',
		270: 'Eggplant',
		269: 'Corn',
		268: 'Corn',
		267: 'Starfruit',
		266: 'Starfruit',
		265: 'Red Cabbage',
		264: 'Red Cabbage',
		263: 'Radish',
		262: 'Radish',
		261: 'Wheat',
		260: 'Wheat',
		259: 'Hot Pepper',
		258: 'Fiddlehead Fern',
		257: 'Blueberry',
		256: 'Morel',
		255: 'Tomato',
		254: 'Tomato',
		253: 'Melon',
		252: 'Melon',
		251: 'Rhubarb',
		250: 'Rhubarb',
		249: 'Kale',
		248: 'Kale',
		247: 'Garlic',
		246: 'Garlic',
		245: 'Garlic',
		244: 'Garlic',
		243: 'Roots Platter',
		242: 'Miner\'s Treat',
		241: 'Dish O\' The Sea',
		240: 'Survival Burger',
		239: 'Farmer\'s Lunch',
		238: 'Stuffing',
		237: 'Cranberry Sauce',
		236: 'Super Meal',
		235: 'Pumpkin Soup',
		234: 'Autumn\'s Bounty',
		233: 'Blueberry Tart',
		232: 'Ice Cream',
		231: 'Rice Pudding',
		230: 'Eggplant Parmesan',
		229: 'Red Plate',
		228: 'Tortilla',
		227: 'Maki Roll',
		226: 'Sashimi',
		225: 'Spicy Eel',
		224: 'Fried Eel',
		223: 'Spaghetti',
		222: 'Cookie',
		221: 'Rhubarb Pie',
		220: 'Pink Cake',
		219: 'Chocolate Cake',
		218: 'Trout Soup',
		217: 'Tom Kha Soup',
		216: 'Tom Kha Soup',
		215: 'Bread',
		214: 'Pepper Poppers',
		213: 'Crispy Bass',
		212: 'Fish Taco',
		211: 'Salmon Dinner',
		210: 'Pancakes',
		209: 'Hashbrowns',
		208: 'Carp Surprise',
		207: 'Glazed Yams',
		206: 'Bean Hotpot',
		205: 'Pizza',
		204: 'Fried Mushroom',
		203: 'Lucky Lunch',
		202: 'Strange Bun',
		201: 'Fried Calamari',
		200: 'Complete Breakfast',
		199: 'Vegetable Medley',
		198: 'Parsnip Soup',
		197: 'Baked Fish',
		196: 'Cheese Cauliflower',
		195: 'Salad',
		194: 'Omelet',
		193: 'Fried Egg',
		192: 'Fried Egg',
		191: 'Potato',
		190: 'Potato',
		189: 'Cauliflower',
		188: 'Cauliflower',
		187: 'Green Bean',
		186: 'Green Bean',
		185: 'Large Milk',
		184: 'Large Milk',
		183: 'Milk',
		182: 'Milk',
		181: 'Large Egg (Brown)',
		180: 'Large Egg (Brown)',
		179: 'Egg (Brown)',
		178: 'Egg (Brown)',
		177: 'Egg (Brown)',
		176: 'Egg (Brown)',
		175: 'Egg (White)',
		174: 'Egg (White)',
		173: 'Large Egg (White)',
		172: 'Large Egg (White)',
		171: 'Large Egg (White)',
		170: 'Large Egg (White)',
		169: 'Large Egg (White)',
		168: 'Large Egg (White)',
		167: 'Large Egg (White)',
		166: 'Joja Cola',
		165: 'Joja Cola',
		164: 'Scorpion Carp',
		163: 'Sandfish',
		162: 'Sandfish',
		161: 'Sandfish',
		160: 'Sandfish',
		159: 'Sandfish',
		158: 'Sandfish',
		157: 'Sandfish',
		156: 'Sandfish',
		155: 'Ghostfish',
		154: 'Super Cucumber',
		153: 'Sea Cucumber',
		152: 'Sea Cucumber',
		151: 'Sea Cucumber',
		150: 'Squid',
		149: 'Red Snapper',
		148: 'Octopus',
		147: 'Eel',
		146: 'Herring',
		145: 'Red Mullet',
		144: 'Sunfish',
		143: 'Pike',
		142: 'Catfish',
		141: 'Carp',
		140: 'Perch',
		139: 'Walleye',
		138: 'Salmon',
		137: 'Rainbow Trout',
		136: 'Smallmouth Bass',
		135: 'Largemouth Bass',
		134: 'Largemouth Bass',
		133: 'Largemouth Bass',
		132: 'Largemouth Bass',
		131: 'Bream',
		130: 'Sardine',
		129: 'Tuna',
		128: 'Anchovy',
		127: 'Pufferfish',
		126: 'Pufferfish',
		125: 'Pufferfish',
		124: 'Pufferfish',
		123: 'Pufferfish',
		122: 'Pufferfish',
		121: 'Pufferfish',
		120: 'Pufferfish',
		119: 'Pufferfish',
		118: 'Pufferfish',
		117: 'Pufferfish',
		116: 'Pufferfish',
		115: 'Pufferfish',
		114: 'Pufferfish',
		113: 'Pufferfish',
		112: 'Pufferfish',
		111: 'Pufferfish',
		110: 'Pufferfish',
		109: 'Pufferfish',
		108: 'Pufferfish',
		107: 'Pufferfish',
		106: 'Pufferfish',
		105: 'Pufferfish',
		104: 'Pufferfish',
		103: 'Pufferfish',
		102: 'Pufferfish',
		101: 'Pufferfish',
		100: 'Pufferfish',
		99: 'Pufferfish',
		98: 'Pufferfish',
		97: 'Pufferfish',
		96: 'Pufferfish',
		95: 'Pufferfish',
		94: 'Pufferfish',
		93: 'Pufferfish',
		92: 'Pufferfish',
		91: 'Sap',
		90: 'Sap',
		89: 'Cactus Fruit',
		88: 'Cactus Fruit',
		87: 'Coconut',
		86: 'Coconut',
		85: 'Coconut',
		84: 'Coconut',
		83: 'Coconut',
		82: 'Coconut',
		81: 'Coconut',
		80: 'Coconut',
		79: 'Coconut',
		78: 'Coconut',
		77: 'Cave Carrot',
		76: 'Cave Carrot',
		75: 'Cave Carrot',
		74: 'Cave Carrot',
		73: 'Cave Carrot',
		72: 'Cave Carrot',
		71: 'Cave Carrot',
		70: 'Cave Carrot',
		69: 'Cave Carrot',
		68: 'Cave Carrot',
		67: 'Cave Carrot',
		66: 'Cave Carrot',
		65: 'Cave Carrot',
		64: 'Cave Carrot',
		63: 'Cave Carrot',
		62: 'Cave Carrot',
		61: 'Cave Carrot',
		60: 'Cave Carrot',
		59: 'Cave Carrot',
		58: 'Cave Carrot',
		57: 'Cave Carrot',
		56: 'Cave Carrot',
		55: 'Cave Carrot',
		54: 'Cave Carrot',
		53: 'Cave Carrot',
		52: 'Cave Carrot',
		51: 'Cave Carrot',
		50: 'Cave Carrot',
		49: 'Cave Carrot',
		48: 'Cave Carrot',
		47: 'Cave Carrot',
		46: 'Cave Carrot',
		45: 'Cave Carrot',
		44: 'Cave Carrot',
		43: 'Cave Carrot',
		42: 'Cave Carrot',
		41: 'Cave Carrot',
		40: 'Cave Carrot',
		39: 'Cave Carrot',
		38: 'Cave Carrot',
		37: 'Cave Carrot',
		36: 'Cave Carrot',
		35: 'Cave Carrot',
		34: 'Cave Carrot',
		33: 'Cave Carrot',
		32: 'Cave Carrot',
		31: 'Cave Carrot',
		30: 'Cave Carrot',
		29: 'Cave Carrot',
		28: 'Cave Carrot',
		27: 'Cave Carrot',
		26: 'Cave Carrot',
		25: 'Cave Carrot',
		24: 'Cave Carrot',
		23: 'Parsnip',
		22: 'Parsnip',
		21: 'Dandelion',
		20: 'Dandelion',
		19: 'Leek',
		18: 'Leek',
		17: 'Daffodil',
		16: 'Daffodil',
		15: 'Wild Horseradish',
		14: 'Wild Horseradish',
		13: 'Wild Horseradish',
		12: 'Wild Horseradish',
		11: 'Wild Horseradish',
		10: 'Wild Horseradish',
		9: 'Wild Horseradish',
		8: 'Wild Horseradish',
		7: 'Wild Horseradish',
		6: 'Wild Horseradish',
		5: 'Wild Horseradish',
		4: 'Wild Horseradish',
		3: 'Wild Horseradish',
		2: 'Wild Horseradish'
	};
	save.cartPrices = {
		'Acorn': 20,
		'Albacore': 75,
		'Algae Soup': 100,
		'Amaranth': 150,
		'Amaranth Seeds': 35,
		'Anchovy': 30,
		'Ancient Seeds': 30,
		'Apple': 100,
		'Apple Sapling': 1000,
		'Apricot': 50,
		'Apricot Sapling': 500,
		'Artichoke': 160,
		'Artichoke Dip': 210,
		'Artichoke Seeds': 15,
		'Autumn\'s Bounty': 350,
		'Bait': 1,
		'Baked Fish': 100,
		'Barbed Hook': 500,
		'Basic Fertilizer': 2,
		'Basic Retaining Soil': 4,
		'Bat Wing': 15,
		'Battery Pack': 500,
		'Bean Hotpot': 100,
		'Bean Starter': 30,
		'Beer': 200,
		'Beet': 100,
		'Beet Seeds': 10,
		'Blackberry': 20,
		'Blackberry Cobbler': 260,
		'Blue Jazz': 50,
		'Blueberry': 50,
		'Blueberry Seeds': 40,
		'Blueberry Tart': 150,
		'Bok Choy': 80,
		'Bok Choy Seeds': 25,
		'Bomb': 50,
		'Bread': 60,
		'Bream': 45,
		'Bruschetta': 210,
		'Bug Meat': 8,
		'Bullhead': 75,
		'Cactus Fruit': 75,
		'Carp': 30,
		'Carp Surprise': 150,
		'Catfish': 200,
		'Cauliflower': 175,
		'Cauliflower Seeds': 40,
		'Cave Carrot': 25,
		'Chanterelle': 160,
		'Cheese': 200,
		'Cheese Cauliflower': 300,
		'Cherry': 80,
		'Cherry Bomb': 50,
		'Cherry Sapling': 850,
		'Chocolate Cake': 200,
		'Chowder': 135,
		'Chub': 50,
		'Clam': 50,
		'Clay': 20,
		'Cloth': 470,
		'Coal': 15,
		'Cobblestone Path': 1,
		'Cockle': 50,
		'Coconut': 100,
		'Coffee Bean': 15,
		'Coleslaw': 345,
		'Common Mushroom': 40,
		'Complete Breakfast': 350,
		'Cookie': 140,
		'Copper Bar': 60,
		'Copper Ore': 5,
		'Coral': 80,
		'Cork Bobber': 250,
		'Corn': 50,
		'Corn Seeds': 75,
		'Crab': 100,
		'Crab Cakes': 275,
		'Cranberries': 75,
		'Cranberry Candy': 175,
		'Cranberry Sauce': 120,
		'Cranberry Seeds': 120,
		'Crayfish': 75,
		'Crispy Bass': 150,
		'Crocus': 60,
		'Crystal Floor': 1,
		'Crystal Fruit': 150,
		'Crystal Path': 1,
		'Daffodil': 30,
		'Dandelion': 40,
		'Deluxe Speed-Gro': 40,
		'Dish O\' The Sea': 220,
		'Dorado': 100,
		'Dressed Spinner': 500,
		'Duck Egg': 95,
		'Duck Feather': 125,
		'Duck Mayonnaise': 375,
		'Eel': 85,
		'Egg (White)': 50,
		'Egg (Brown)': 50,
		'Eggplant': 60,
		'Eggplant Parmesan': 200,
		'Eggplant Seeds': 10,
		'Escargot': 125,
		'Fairy Rose': 290,
		'Fairy Seeds': 100,
		'Fall Seeds': 45,
		'Farmer\'s Lunch': 150,
		'Fiber': 1,
		'Fiddlehead Fern': 90,
		'Fiddlehead Risotto': 350,
		'Fish Stew': 175,
		'Fish Taco': 500,
		'Fried Calamari': 150,
		'Fried Eel': 120,
		'Fried Egg': 35,
		'Fried Mushroom': 200,
		'Fruit Salad': 450,
		'Garlic': 60,
		'Garlic Seeds': 20,
		'Gate': 4,
		'Ghostfish': 45,
		'Glazed Yams': 200,
		'Goat Cheese': 375,
		'Goat Milk': 225,
		'Gold Bar': 250,
		'Gold Ore': 25,
		'Grape': 80,
		'Grape Starter': 30,
		'Gravel Path': 1,
		'Green Bean': 40,
		'Halibut': 80,
		'Hardwood': 15,
		'Hardwood Fence': 10,
		'Hashbrowns': 120,
		'Hazelnut': 90,
		'Herring': 30,
		'Holly': 80,
		'Honey': 100,
		'Hops': 25,
		'Hops Starter': 30,
		'Hot Pepper': 40,
		'Ice Cream': 120,
		'Iridium Bar': 1000,
		'Iridium Ore': 100,
		'Iron Bar': 120,
		'Iron Fence': 6,
		'Iron Ore': 10,
		'Jazz Seeds': 15,
		'Jelly': 160,
		'Joja Cola': 25,
		'Juice': 150,
		'Kale': 110,
		'Kale Seeds': 35,
		'L. Goat Milk': 345,
		'Large Egg (White)': 95,
		'Large Egg (Brown)': 95,
		'Large Milk': 190,
		'Largemouth Bass': 100,
		'Lead Bobber': 150,
		'Leek': 60,
		'Life Elixir': 500,
		'Lingcod': 120,
		'Lobster': 120,
		'Lobster Bisque': 205,
		'Lucky Lunch': 250,
		'Magnet': 15,
		'Maki Roll': 220,
		'Maple Bar': 300,
		'Maple Seed': 5,
		'Maple Syrup': 200,
		'Mayonnaise': 190,
		'Mead': 200,
		'Mega Bomb': 50,
		'Melon': 250,
		'Melon Seeds': 40,
		'Milk': 125,
		'Miner\'s Treat': 200,
		'Morel': 150,
		'Mussel': 30,
		'Nautilus Shell': 120,
		'Oak Resin': 150,
		'Octopus': 150,
		'Oil of Garlic': 1000,
		'Omelet': 125,
		'Orange': 100,
		'Orange Sapling': 1000,
		'Oyster': 40,
		'Pale Ale': 300,
		'Pale Broth': 150,
		'Pancakes': 80,
		'Parsnip': 35,
		'Parsnip Seeds': 10,
		'Parsnip Soup': 120,
		'Peach': 140,
		'Peach Sapling': 1500,
		'Pepper Poppers': 200,
		'Pepper Seeds': 20,
		'Perch': 55,
		'Periwinkle': 20,
		'Pickles': 100,
		'Pike': 100,
		'Pine Cone': 5,
		'Pine Tar': 100,
		'Pink Cake': 480,
		'Pizza': 300,
		'Plum Pudding': 260,
		'Pomegranate': 140,
		'Pomegranate Sapling': 1500,
		'Poppy': 140,
		'Poppy Seeds': 50,
		'Poppyseed Muffin': 250,
		'Potato': 80,
		'Potato Seeds': 25,
		'Pufferfish': 200,
		'Pumpkin': 320,
		'Pumpkin Pie': 385,
		'Pumpkin Seeds': 50,
		'Pumpkin Soup': 300,
		'Purple Mushroom': 250,
		'Quality Fertilizer': 10,
		'Quality Retaining Soil': 5,
		'Quality Sprinkler': 450,
		'Rabbit\'s Foot': 565,
		'Radish': 90,
		'Radish Salad': 300,
		'Radish Seeds': 20,
		'Rainbow Shell': 300,
		'Rainbow Trout': 65,
		'Rare Seed': 200,
		'Red Cabbage': 260,
		'Red Cabbage Seeds': 50,
		'Red Mullet': 75,
		'Red Mushroom': 75,
		'Red Plate': 400,
		'Red Snapper': 50,
		'Refined Quartz': 50,
		'Rhubarb': 220,
		'Rhubarb Pie': 400,
		'Rhubarb Seeds': 50,
		'Rice Pudding': 260,
		'Roasted Hazelnuts': 270,
		'Roots Platter': 100,
		'Salad': 110,
		'Salmon': 75,
		'Salmon Dinner': 300,
		'Salmonberry': 5,
		'Sandfish': 75,
		'Sap': 2,
		'Sardine': 40,
		'Sashimi': 75,
		'Scorpion Carp': 150,
		'Sea Cucumber': 75,
		'Sea Urchin': 160,
		'Shad': 60,
		'Shrimp': 60,
		'Slime': 5,
		'Smallmouth Bass': 50,
		'Snail': 65,
		'Snow Yam': 100,
		'Solar Essence': 40,
		'Spaghetti': 120,
		'Spangle Seeds': 25,
		'Speed-Gro': 20,
		'Spice Berry': 80,
		'Spicy Eel': 175,
		'Spinner': 250,
		'Spring Onion': 8,
		'Spring Seeds': 35,
		'Sprinkler': 100,
		'Squid': 80,
		'Starfruit': 750,
		'Starfruit Seeds': 200,
		'Stepping Stone Path': 1,
		'Stir Fry': 335,
		'Stone': 0,
		'Stone Fence': 2,
		'Stone Floor': 1,
		'Strange Bun': 225,
		'Straw Floor': 1,
		'Strawberry': 120,
		'Stuffing': 165,
		'Sturgeon': 200,
		'Summer Seeds': 55,
		'Summer Spangle': 90,
		'Sunfish': 30,
		'Sunflower': 80,
		'Sunflower Seeds': 20,
		'Super Cucumber': 250,
		'Super Meal': 220,
		'Survival Burger': 180,
		'Sweet Gem Berry': 3000,
		'Sweet Pea': 50,
		'Tiger Trout': 150,
		'Tilapia': 75,
		'Tom Kha Soup': 250,
		'Tomato': 60,
		'Tomato Seeds': 25,
		'Tortilla': 50,
		'Trap Bobber': 200,
		'Treasure Hunter': 250,
		'Trout Soup': 100,
		'Truffle': 625,
		'Truffle Oil': 1065,
		'Tulip': 30,
		'Tulip Bulb': 10,
		'Tuna': 100,
		'Vegetable Medley': 120,
		'Void Egg': 65,
		'Void Essence': 50,
		'Void Mayonnaise': 275,
		'Walleye': 105,
		'Weathered Floor': 1,
		'Wheat': 25,
		'Wheat Seeds': 5,
		'Wild Horseradish': 50,
		'Wild Plum': 80,
		'Wine': 400,
		'Winter Root': 70,
		'Winter Seeds': 30,
		'Wood': 2,
		'Wood Fence': 1,
		'Wood Floor': 1,
		'Wood Path': 1,
		'Woodskip': 75,
		'Wool': 340,
		'Yam': 160,
		'Yam Seeds': 30
	};
	save.cartFurniture = {
		0: "Oak Chair",
		3: "Walnut Chair",
		6: "Birch Chair",
		9: "Mahogany Chair",
		12: "Red Diner Chair",
		15: "Blue Diner Chair",
		18: "Country Chair",
		21: "Breakfast Chair",
		24: "Pink Office Chair",
		27: "Purple Office Chair",
		30: "Green Office Stool",
		31: "Orange Office Stool",
		64: "Dark Throne",
		67: "Dining Chair",
		70: "Dining Chair",
		73: "Green Plush Seat",
		76: "Pink Plush Seat",
		79: "Winter Chair",
		82: "Groovy Chair",
		85: "Cute Chair",
		88: "Stump Seat",
		91: "Metal Chair",
		94: "Green Stool",
		95: "Blue Stool",
		128: "King Chair",
		192: "Oak Bench",
		197: "Walnut Bench",
		202: "Birch Bench",
		207: "Mahogany Bench",
		212: "Modern Bench",
		288: "Blue Armchair",
		294: "Red Armchair",
		300: "Green Armchair",
		306: "Yellow Armchair",
		312: "Brown Armchair",
		416: "Blue Couch",
		424: "Red Couch",
		432: "Green Couch",
		440: "Yellow Couch",
		512: "Brown Couch",
		520: "Dark Couch",
		528: "Wizard Couch",
		536: "Woodsy Couch",
		704: "Oak Dresser",
		709: "Walnut Dresser",
		714: "Birch Dresser",
		719: "Mahogany Dresser",
		724: "Coffee Table",
		727: "Stone Slab",
		800: "Winter Dining Table",
		807: "Festive Dining Table",
		814: "Mahogany Dining Table",
		821: "Modern Dining Table",
		1120: "Oak Table",
		1122: "Walnut Table",
		1124: "Birch Table",
		1126: "Mahogany Table",
		1128: "Sun Table",
		1130: "Moon Table",
		1132: "Modern Table",
		1134: "Pub Table",
		1136: "Luxury Table",
		1138: "Diviner Table",
		1140: "Neolithic Table",
		1142: "Puzzle Table",
		1144: "Winter Table",
		1146: "Candy Table",
		1148: "Luau Table",
		1150: "Dark Table",
		1216: "Oak Tea-Table",
		1218: "Walnut Tea-Table",
		1220: "Birch Tea-Table",
		1222: "Mahogany Tea-Table",
		1224: "Modern Tea-Table",
		1280: "China Cabinet",
		1283: "Artist Bookcase",
		1285: "Luxury Bookcase",
		1287: "Modern Bookcase",
		1289: "Dark Bookcase",
		1291: "Ceramic Pillar",
		1292: "Gold Pillar",
		1293: "Industrial Pipe",
		1294: "Indoor Palm",
		1295: "Totem Pole",
		1296: "Manicured Pine",
		1297: "Topiary Tree",
		1362: "Small Plant",
		1363: "Table Plant",
		1364: "Decorative Bowl",
		1365: "Futan Bear",
		1366: "Globe",
		1367: "Model Ship",
		1368: "Small Crystal",
		1369: "Decorative Lantern",
		1376: "House Plant (1376)",
		1377: "House Plant (1377)",
		1378: "House Plant (1378)",
		1379: "House Plant (1379)",
		1380: "House Plant (1380)",
		1381: "House Plant (1381)",
		1382: "House Plant (1382)",
		1383: "House Plant (1383)",
		1384: "House Plant (1384)",
		1385: "House Plant (1385)",
		1386: "House Plant (1386)",
		1387: "House Plant (1387)",
		1388: "House Plant (1388)",
		1389: "House Plant (1389)",
		1390: "House Plant (1390)",
		1391: "Oak End Table",
		1393: "Walnut End Table",
		1395: "Birch End Table",
		1397: "Mahogany End Table",
		1399: "Modern End Table",
		1400: "Grandmother End Table",
		1401: "Winter End Table",
		1440: "Tree of the Winter Star",
		1443: "Country Lamp",
		1445: "Box Lamp",
		1447: "Modern Lamp",
		1449: "Classic Lamp",
		1451: "Red Rug",
		1456: "Patchwork Rug",
		1461: "Dark Rug",
		1539: "'The Muzzamaroo'",
		1543: "'Pathways'",
		1547: "'Queen of the Gem Sea'",
		1550: "'Vanilla Villa'",
		1552: "'Primal Motion'",
		1557: "'Sun #44'",
		1559: "Wallflower Pal",
		1561: "'Spires'",
		1563: "'Highway 89'",
		1565: "Calico Falls",
		1567: "Needlepoint Flower",
		1600: "Skull Poster",
		1601: "'Sun #45'",
		1602: "'Little Tree'",
		1603: "'Blueberries'",
		1604: "'Blue City'",
		1605: "Little Photos",
		1606: "'Dancing Grass'",
		1607: "'VGA Paradise'",
		1609: "J. Cola Light",
		1612: "'Kitemaster '95'"
	};
	save.geodeContents = {
		535: [538, 542, 548, 549, 552, 555, 556, 557, 558, 566, 568, 569, 571, 574, 576, 121],
		536: [541, 544, 545, 546, 550, 551, 559, 560, 561, 564, 567, 572, 573, 577, 123],
		537: [539, 540, 543, 547, 553, 554, 562, 563, 565, 570, 575, 578, 122],
		749: [538, 542, 548, 549, 552, 555, 556, 557, 558, 566, 568, 569, 571, 574, 576, 541, 544, 545, 546, 550, 551, 559,
			560, 561, 564, 567, 572, 573, 577, 539, 540, 543, 547, 553, 554, 562, 563, 565, 570, 575, 578, 121, 122, 123]
	};
	save.minerals = {
		74: 'Prismatic Shard',
		82: 'Fire Quartz',
		84: 'Frozen Tear',
		86: 'Earth Crystal',
		121: 'Dwarvish Helm',
		122: 'Dwarf Gadget',
		123: 'Ancient Drum',
		330: 'Clay',
		378: 'Copper Ore',
		380: 'Iron Ore',
		382: 'Coal',
		384: 'Gold Ore',
		386: 'Iridium Ore',
		390: 'Stone',
		538: 'Alamite',
		539: 'Bixite',
		540: 'Baryite',
		541: 'Aerinite',
		542: 'Calcite',
		543: 'Dolomite',
		544: 'Esperite',
		545: 'Fluorapatite',
		546: 'Geminite',
		547: 'Helvite',
		548: 'Jamborite',
		549: 'Jagoite',
		550: 'Kyanite',
		551: 'Lunarite',
		552: 'Malachite',
		553: 'Neptunite',
		554: 'Lemon Stone',
		555: 'Nekoite',
		556: 'Orpiment',
		557: 'Petrified Slime',
		558: 'Thunder Egg',
		559: 'Pyrite',
		560: 'Ocean Stone',
		561: 'Ghost Crystal',
		562: 'Tigerseye',
		563: 'Jasper',
		564: 'Opal',
		565: 'Fire Opal',
		566: 'Celestine',
		567: 'Marble',
		568: 'Sandstone',
		569: 'Granite',
		570: 'Basalt',
		571: 'Limestone',
		572: 'Soapstone',
		573: 'Hematite',
		574: 'Mudstone',
		575: 'Obsidian',
		576: 'Slate',
		577: 'Fairy Stone',
		578: 'Star Shards'
	};
	
	// Show input field immediately
	$(document.getElementById('input-container')).show();

	// Utility functions
	function addCommas(x) {
		// Jamie Taylor @ https://stackoverflow.com/questions/3883342/add-commas-to-a-number-in-jquery
		return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	}

	function capitalize(s) {
		// joelvh @ https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
		return s && s[0].toUpperCase() + s.slice(1);
	}

	function wikify(item, page) {
		// removing egg colors & changing spaces to underscores
		var trimmed = item.replace(' (White)', '');
		trimmed = trimmed.replace(' (Brown)', '');
		trimmed = trimmed.replace(/ /g, '_');
		return (page) ? ('<a href="http://stardewvalleywiki.com/' + page + '#' + trimmed + '">' + item + '</a>') :
					('<a href="http://stardewvalleywiki.com/' + trimmed + '">' + item + '</a>');
	}

	function parseSummary(xmlDoc) {
		var output = '',
			farmTypes = ['Standard', 'Riverland', 'Forest', 'Hill-top', 'Wilderness'],
			playTime,
			playHr,
			playMin;
		// This app doesn't actually need a whole lot from the save file, and can be run from just the gameID number.
		// Right now, that functionality is "secret" and accessed by adding "?id=123456789" (or similar) to the URL.
		// As a result, this is the only function that actually reads anything from the save file; it will store the
		// important information (or reasonable defaults) into the save structure and all other functions will use that.
		if (typeof xmlDoc !== 'undefined') {
			save.gameID = Number($(xmlDoc).find('uniqueIDForThisGame').text());
			output += '<span class="result">Game ID: ' + save.gameID + '</span><br />\n';
			// Farmer & farm names are read as html() because they come from user input and might contain characters
			// which must be escaped.
			output += '<span class="result">' + $(xmlDoc).find('player > name').html() + ' of ' +
				$(xmlDoc).find('player > farmName').html() + ' Farm (' +
				farmTypes[$(xmlDoc).find('whichFarm').text()] + ')</span><br />\n';
			// Date originally used XXForSaveGame elements, but those were not always present on saves downloaded from upload.farm
			save.daysPlayed = Number($(xmlDoc).find('stats > daysPlayed').text());
			save.year = Number($(xmlDoc).find('year').text());
			output += '<span class="result">Day ' + $(xmlDoc).find('dayOfMonth').text() + ' of ' +
				capitalize($(xmlDoc).find('currentSeason').text()) + ', Year ' + save.year +
				' (' + save.daysPlayed + ' days played)</span><br />\n';
			// Playtime of < 1 min will be rounded up to 1 min to avoid blank output.
			playTime = Math.max(Number($(xmlDoc).find('player > millisecondsPlayed').text()), 6e4);
			playHr = Math.floor(playTime / 36e5);
			playMin = Math.floor((playTime % 36e5) / 6e4);
			output += '<span class="result">Played for ';
			if (playHr > 0) {
				output += playHr + ' hr ';
			}
			if (playMin > 0) {
				output += playMin + ' min ';
			}
			output += '</span><br />\n';
			save.geodesCracked = Number($(xmlDoc).find('stats > geodesCracked').text());
			output += '<span class="result">' + save.geodesCracked + ' geodes opened</span><br />\n';
			save.deepestMineLevel = Number($(xmlDoc).find('player > deepestMineLevel').text());
			output += '<span class="result">Has reached level ' + Math.min(120, save.deepestMineLevel) + ' of the mine</span><br />\n';
		} else if ($.QueryString.hasOwnProperty("id")) {
			save.gameID = parseInt($.QueryString.id);
			save.daysPlayed = 1;
			save.year = 1;
			save.geodesCracked = 0;
			save.deepestMineLevel = 0;
			output += '<span class="result">App run using supplied gameID ' + save.gameID +
				'. No save information available so minimal progress assumed.</span><br />\n';
		} else {
			output = '<span class="error">Fatal Error: Problem reading save file and no ID passed via query string.</span>';
		}

		return output;
	}

	function buttonHandler(button) {
		var tab = button.id.split('-')[0];
		if (typeof(button.value) === 'undefined' || button.value === 'reset') {
			updateTab(tab);
		} else {
			updateTab(tab, Number(button.value));
		}
	}
	
	function predictMines(offset) {
		// Mushroom level is determined by StardewValley.Locations.MineShaft.chooseLevelType()
		// Infestation is determined by StardewValley.Locations.MineShaft.loadLevel()
		var output = "",
			rng,
			rainbowLights,
			infestedMonster,
			infestedSlime,
			mineLevel,
			day,
			weekDay,
			week,
			monthName,
			month,
			year,
			tclass;
		if (typeof(offset) === 'undefined') {
			offset = 28 * Math.floor(save.daysPlayed/28);
		}
		if (offset < 112) {
			$(document.getElementById('mines-prev-year')).prop("disabled", true);
		} else {
			$(document.getElementById('mines-prev-year')).val(offset - 112);
			$(document.getElementById('mines-prev-year')).prop("disabled", false);
		}
		if (offset < 28) {
			$(document.getElementById('mines-prev-month')).prop("disabled", true);
		} else {
			$(document.getElementById('mines-prev-month')).val(offset - 28);
			$(document.getElementById('mines-prev-month')).prop("disabled", false);
		}
		$(document.getElementById('mines-reset')).val('reset');
		$(document.getElementById('mines-next-month')).val(offset + 28);
		$(document.getElementById('mines-next-year')).val(offset + 112);
		month = Math.floor(offset / 28);
		monthName = save.seasonNames[month % 4];
		year = 1 + Math.floor(offset / 112);
		output += '<table class="calendar"><thead><tr><th colspan="7">' + monthName + ' Year ' + year + '</th></tr>\n';
		output += '<tr><th>M</th><th>T</th><th>W</th><th>Th</th><th>F</th><th>Sa</th><th>Su</th></tr></thead>\n<tbody>';
		for (week = 0; week < 4; week++) {
			output += "<tr>";
			for (weekDay = 1; weekDay < 8; weekDay++) {
				rainbowLights = [];
				infestedMonster = [];
				infestedSlime = [];
				day = 7 * week + weekDay + offset;
				for (mineLevel = 1; mineLevel < 120; mineLevel++) {
					if (mineLevel % 5 === 0) {
						// skip elevator floors for everything
						continue;
					}
					// Monster infestation seems to override mushroom spawns so that is checked first
					rng = new CSRandom(day + mineLevel + save.gameID / 2);
					if (mineLevel % 40 > 5 && mineLevel % 40 < 30 && mineLevel % 40 !== 19) {			
						if (rng.NextDouble() < 0.05) {
							if (rng.NextDouble() < 0.5) {
								infestedMonster.push(mineLevel);
							} else {
								infestedSlime.push(mineLevel);
							}
							continue; // skips Mushroom check
						}
					}
					// Reset the seed for checking Mushrooms. Note, there are a couple checks related to
					// darker than normal lighting. We don't care about the results but need to mimic them.
					rng = new CSRandom(day + mineLevel + save.gameID / 2);
					if (rng.NextDouble() < 0.3 && mineLevel > 2) {
						rng.NextDouble(); // checked vs < 0.3 again
					}
						rng.NextDouble(); // checked vs < 0.15
					if (rng.NextDouble() < 0.035 && mineLevel > 80) { 
						rainbowLights.push(mineLevel); 
					}
				}
				if (day < save.daysPlayed) {
					tclass = "past";
				} else if (day === save.daysPlayed) {
					tclass = "current";
				} else {
					tclass = "future";
				}
				if (rainbowLights.length === 0) {
					rainbowLights.push("None");
				}
				if (infestedMonster.length === 0) {
					infestedMonster.push("None");
				}
				if (infestedSlime.length === 0) {
					infestedSlime.push("None");
				}
				output += '<td class="' + tclass + '"><span class="date"> ' + (day - offset) + '</span><br />' + 
					'<span class="cell"><img src="IconM.png" alt="Mushroom"> ' + rainbowLights.join(', ') + 
					'<br /><img src="IconI.png" alt="Sword"> ' + infestedMonster.join(', ') +
					'<br /><img src="IconS.png" alt="Slime"> ' + infestedSlime.join(', ') + '</span></td>';			
			}
			output += "</tr>\n";
		}
		output += '<tr><td colspan="7" class="legend">Legend: <img src="IconM.png" alt="Mushroom"> Mushroom Level | <img src="IconI.png" alt="Sword"> Monster Infestation | <img src="IconS.png" alt="Slime"> Slime Infestation</td></tr>';
		output += "</tbody></table>\n";
		return output;
	}
	
	function predictCart(offset) {
		// logic from StardewValley.Utility.getTravelingMerchantStock()
		var output = '',
			month,
			monthName,
			year,
			dayOfMonth,
			slot,
			item,
			qty,
			price,
			rngFri,
			rngSun;
		if (typeof(offset) === 'undefined') {
			offset = 7 * Math.floor((save.daysPlayed - 1) / 7);
		}
		if (offset < 7) {
			$(document.getElementById('cart-prev-week')).prop("disabled", true);
		} else {
			$(document.getElementById('cart-prev-week')).val(offset - 7);
			$(document.getElementById('cart-prev-week')).prop("disabled", false);
		}
		$(document.getElementById('cart-reset')).val('reset');
		$(document.getElementById('cart-next-week')).val(offset + 7);
		month = Math.floor(offset / 28);
		monthName = save.seasonNames[month % 4];
		year = 1 + Math.floor(offset / 112);
		dayOfMonth = offset % 28;
		output += '<table class="output"><thead><tr><th> </th><th colspan="3">Friday ' + monthName + ' ' + (dayOfMonth + 5) + ' Year ' + year +
			'</th>' + '<th colspan="3">Sunday ' + monthName + ' ' + (dayOfMonth + 7) + ' Year ' + year + '</th></tr>\n';
		output += '<tr><th> </th><th class="item">Item</th><th class="qty">Qty</th><th class="price">Price</th>' +
			'<th class="item">Item</th><th class="qty">Qty</th><th class="price">Price</th></tr>\n<tbody>';
		// Odd doubling of RNG because of outputting both Friday & Sunday of the same week in the same table.
		rngFri = new CSRandom(save.gameID + offset + 5);
		rngSun = new CSRandom(save.gameID + offset + 7);
		for (slot = 1; slot <= 10; slot++) {
			output += "<tr><td>Basic Item " + slot + "</td>";
			item = save.cartItems[rngFri.Next(2,790)];
			price = Math.max(rngFri.Next(1,11)*100, save.cartPrices[item]*rngFri.Next(3,6));
			qty = (rngFri.NextDouble() < 0.1) ? 5 : 1;
			output += "<td>" + wikify(item) + "</td><td>" + qty + "</td><td>" + price + "g</td>";
			item = save.cartItems[rngSun.Next(2,790)];
			price = Math.max(rngSun.Next(1,11)*100, save.cartPrices[item]*rngSun.Next(3,6));
			qty = (rngSun.NextDouble() < 0.1) ? 5 : 1;
			output += "<td>" + wikify(item) + "</td><td>" + qty + "</td><td>" + price + "g</td></tr>";
		}
		// Furniture uses StardewValley.Utility.getRandomFurniture() & StardewValley.Utility.isFurnitureOffLimitsForSale()
		// Rather than fully emulating both of those functions, we will simply make sure the save.cartFurniture() structure
		// only contains items which are valid for sale.
		slot = -1;
		while (!save.cartFurniture.hasOwnProperty(slot)) {
			slot = rngFri.Next(0,1613);
		}
		item = save.cartFurniture[slot];
		price = rngFri.Next(1,11)*250;
		output += "<tr><td>Furniture</td><td>" + wikify(item,'Furniture') + '</td><td>1</td><td>' + price + 'g</td>';
		slot = -1;
		while (!save.cartFurniture.hasOwnProperty(slot)) {
			slot = rngSun.Next(0,1613);
		}
		item = save.cartFurniture[slot];
		price = rngSun.Next(1,11)*250;
		output += "<td>" + wikify(item,'Furniture') + '</td><td>1</td><td>' + price + 'g</td></tr>';
		// Next comes seasonal specials
		output += "<td>Seasonal Special</td>";
		if (month % 4 < 2) {
			item = 'Rare Seed';
			price = 1000;
			qty = (rngFri.NextDouble() < 0.1) ? 5 : 1;
			output += "<td>" + wikify(item) + "</td><td>" + qty + "</td><td>" + price + "g</td>";
			qty = (rngSun.NextDouble() < 0.1) ? 5 : 1;
			output += "<td>" + wikify(item) + "</td><td>" + qty + "</td><td>" + price + "g</td></tr>";
		} else {
			if (rngFri.NextDouble() < 0.4) {
				item = wikify('Rarecrow (Snowman)');
				qty = 1;
				price = '4000g';
			} else {
				item = '(None)';
				qty = '(N/A)';
				price = '(N/A)';
			}
			output += "<td>" + item + "</td><td>" + qty + "</td><td>" + price + "</td>";
			if (rngSun.NextDouble() < 0.4) {
				item = wikify('Rarecrow (Snowman)');
				qty = 1;
				price = '4000g';
			} else {
				item = '(None)';
				qty = '(N/A)';
				price = '(N/A)';
			}
			output += "<td>" + item + "</td><td>" + qty + "</td><td>" + price + "</td></tr>";
		}
		// Coffee Bean
		output += "<td>Other Special</td>";
		if (rngFri.NextDouble() < 0.25) {
			item = wikify('Coffee Bean');
			qty = 1;
			price = '2500g';
		} else {
			item = '(None)';
			qty = '(N/A)';
			price = '(N/A)';
		}
		output += "<td>" + item + "</td><td>" + qty + "</td><td>" + price + "</td>";
		if (rngSun.NextDouble() < 0.25) {
			item = wikify('Coffee Bean');
			qty = 1;
			price = '2500g';
		} else {
			item = '(None)';
			qty = '(N/A)';
			price = '(N/A)';
		}
		output += "<td>" + item + "</td><td>" + qty + "</td><td>" + price + "</td></tr>";
		output += '</tbody></table>\n';
		return output;
	}
	
	function predictGeodes(offset) {
		// logic from StardewValley.Utility.getTreasureFromGeode()
		var output = '',
			numCracked,
			g,
			r1,
			r2,
			r3,
			r4,
			qty,
			q1,
			q2,
			q3,
			q4,
			c,
			next,
			tclass,
			rng;
		if (typeof(offset) === 'undefined') {
			offset = 20 * Math.floor(save.geodesCracked / 20);
		}
		if (offset < 20) {
			$(document.getElementById('geode-prev')).prop("disabled", true);
		} else {
			$(document.getElementById('geode-prev')).val(offset - 20);
			$(document.getElementById('geode-prev')).prop("disabled", false);
		}
		$(document.getElementById('geode-reset')).val('reset');
		$(document.getElementById('geode-next')).val(offset + 20);
		output += '<table class="output"><thead><tr><th rowspan="2" class="index">Number Opened</th>' +
			'<th colspan="2"><a href="https://stardewvalleywiki.com/Geode"><img src="Geode.png"></a> Geode</th>' + 
			'<th colspan="2"><a href="https://stardewvalleywiki.com/Frozen_Geode"><img src="GeodeF.png"></a> Frozen Geode</th>' +
 			'<th colspan="2"><a href="https://stardewvalleywiki.com/Magma_Geode"><img src="GeodeM.png"></a> Magma Geode</th>' +
 			'<th colspan="2"><a href="https://stardewvalleywiki.com/Omni_Geode"><img src="GeodeO.png"></a> Omni Geode</th></tr>\n';
		output += '<tr><th class="item">Item</th><th class="qty">Qty</th><th class="item">Item</th><th class="qty">Qty</th>' +
			'<th class="item">Item</th><th class="qty">Qty</th><th class="item">Item</th><th class="qty">Qty</th></tr>\n<tbody>';
		// We are going to predict all 4 types of geodes at once, so we have multiple variables and in several cases will
		// use rng.Double() & scale things ourselves where the source does rng.Next() with various different integers.
		for (g = 1; g <= 20; g++) {
			numCracked = offset + g;
			r1 = 'Stone';
			r2 = 'Stone';
			r3 = 'Stone';
			r4 = 'Stone';
			q1 = 1;
			q2 = 1;
			q3 = 1;
			q4 = 1;
			rng = new CSRandom(numCracked + save.gameID / 2);
			if (rng.NextDouble() < 0.5) {
				qty = rng.Next(3)*2 + 1;
				if (rng.NextDouble() < 0.1) { qty = 10; }
				if (rng.NextDouble() < 0.01) { qty = 20; }
				if (rng.NextDouble() < 0.5) {
					c = rng.Next(4);
					if (c < 2) {
						r1 = save.minerals[390];
						q1 = qty;
						r2 = r1;
						q2 = qty;
						r3 = r1;
						q3 = qty;
						r4 = r1;
						q4 = qty;
					} else if (c === 2) {
						r1 = save.minerals[330];
						q1 = 1;
						r2 = r1;
						r3 = r1;
						r4 = r1;
					} else {
						r1 = save.minerals[86];
						q1 = 1;
						r2 = save.minerals[84];
						r3 = save.minerals[82];
						r4 = save.minerals[82];
					}
				} else {
					next = rng.NextDouble();
					// plain geode (535)
					c = Math.floor(next*3);
					if (c === 0) {
						r1 = save.minerals[378];
						q1 = qty;
					} else if (c === 1) {
						r1 = save.minerals[(save.deepestMineLevel > 25) ? 380 : 378];
						q1 = qty;
					} else {
						r1 = save.minerals[382];
						q1 = qty;
					}
					// frozen geode (536)
					c = Math.floor(next*4);
					if (c === 0) {
						r2 = save.minerals[378];
						q2 = qty;
					} else if (c === 1) {
						r2 = save.minerals[380];
						q2 = qty;
					} else if (c === 2) {
						r2 = save.minerals[382];
						q2 = qty;
					} else {
						r2 = save.minerals[(save.deepestMineLevel > 75) ? 384 : 380];
						q2 = qty;
					}
					// magma & omni geodes
					c = Math.floor(next*5);
					if (c === 0) {
						r3 = save.minerals[378];
						r4 = r3;
						q3 = qty;
						q4 = q3;
					} else if (c === 1) {
						r3 = save.minerals[380];
						r4 = r3;
						q3 = qty;
						q4 = q3;
					} else if (c === 2) {
						r3 = save.minerals[382];
						r4 = r3;
						q3 = qty;
						q4 = q3;
					} else if (c === 3) {
						r3 = save.minerals[384];
						r4 = r3;
						q3 = qty;
						q4 = q3;
					} else {
						r3 = save.minerals[386];
						r4 = r3;
						q3 = Math.floor(qty/2 + 1);
						q4 = q3;
					}
				}
			} else {
				next = rng.NextDouble();
				r1 = save.minerals[save.geodeContents[535][Math.floor(next*save.geodeContents[535].length)]];
				r2 = save.minerals[save.geodeContents[536][Math.floor(next*save.geodeContents[536].length)]];
				r3 = save.minerals[save.geodeContents[537][Math.floor(next*save.geodeContents[537].length)]];
				if (rng.NextDouble() < 0.008 && numCracked > 15) {
					r4 = save.minerals[74];
				} else {
					r4 = save.minerals[save.geodeContents[749][Math.floor(next*save.geodeContents[749].length)]];
				}
			}
			if (numCracked === save.geodesCracked + 1) {
				tclass = "current";
			} else if (numCracked <= save.geodesCracked) {
				tclass = "past";
			} else {
				tclass = "future";
			}
			output += '<tr class="' + tclass + '"><td>' + numCracked + '</td><td>' + wikify(r1) + '</td><td>' + q1 + '</td><td>' + wikify(r2) +
				'</td><td>' + q2 + '</td><td>' + wikify(r3) + '</td><td>' +  q3 + '</td><td>' + wikify(r4) + '</td><td>' + q4 + '</td></tr>';
		}
		output += '</tbody></thead>';
		return output;
	}
	
	function predictWinterStar(offset) {
		var output = "",
			// NPC list from Data\NPCDispositions
			npcs = ['Abigail', 'Caroline', 'Clint', 'Demetrius', 'Willy', 'Elliott', 'Emily',
					'Evelyn', 'George', 'Gus', 'Haley', 'Harvey', 'Jas', 'Jodi', 'Alex',
					'Kent', 'Leah', 'Lewis', 'Linus', 'Marlon', 'Marnie', 'Maru', 'Pam',
					'Penny', 'Pierre', 'Robin', 'Sam', 'Sebastian', 'Shane', 'Vincent',
					'Wizard', 'Dwarf', 'Sandy', 'Krobus'],
			secretSantaGiveTo = '',
			secretSantaGetFrom = '',
			year,
			rng,
			tclass;
		if (typeof(offset) === 'undefined') {
			offset = 10 * Math.floor(save.year / 10);
		}
		if (offset < 10) {
			$(document.getElementById('winterstar-prev')).prop("disabled", true);
		} else {
			$(document.getElementById('winterstar-prev')).val(offset - 10);
			$(document.getElementById('winterstar-prev')).prop("disabled", false);
		}
		$(document.getElementById('winterstar-reset')).val('reset');
		$(document.getElementById('winterstar-next')).val(offset + 10);

		output += '<table class="output"><thead><tr><th>Year</th><th>Farmer gives gift to</th><th>Farmer receives gift from</th></tr>\n<tbody>';
		for (year = offset + 1; year <= offset + 10; year++) {
			// Gift giver and receiver logic from StardewValley.Event.setUpPlayerControlSequence() and StardewValley.Utility.getRandomTownNPC()
			// While it looks like the gift itself might be predictable from StardewValley.Utility.getGiftFromNPC(), the RNG there gets seeded
			// by an expression that includes the NPC's X coordinate, and (based on in-game testing) that seems to be from a pre-festival
			// position which is not easily predictable.
			rng = new CSRandom(save.gameID / 2 - year);
			secretSantaGiveTo = npcs[rng.Next(npcs.length)];
			secretSantaGetFrom = '';
			while (secretSantaGiveTo === 'Wizard' || secretSantaGiveTo === 'Krobus' || secretSantaGiveTo === 'Sandy' || secretSantaGiveTo === 'Dwarf' || secretSantaGiveTo === 'Marlon' ) {
				secretSantaGiveTo = npcs[rng.Next(npcs.length)];
			}
			while (secretSantaGetFrom === '' || secretSantaGetFrom === secretSantaGiveTo) {
				secretSantaGetFrom = npcs[rng.Next(npcs.length)];
			}
			if (year < save.year) {
				tclass = "past";
			} else if (year === save.year) {
				tclass = "current";
			} else {
				tclass = "future";
			}
			output += '<tr class="' + tclass + '"><td>' + year + "</td><td>" + wikify(secretSantaGiveTo) +
				"</td><td>" + wikify(secretSantaGetFrom) + "</td></tr>\n";
		}
		output += "</tbody></table>\n";
		return output;
	}
	
	function updateTab(tabID, extra) {
		var output = '';
		if (tabID === 'mines') {
			output = predictMines(extra);
		} else if (tabID === 'cart') {
			output = predictCart(extra);
		} else if (tabID === 'geode') {
			output = predictGeodes(extra);
		} else if (tabID === 'winterstar') {
			output = predictWinterStar(extra);
		} else {
			console.log("Unknown tabID: " + tabID);
		}
		document.getElementById('out-' + tabID).innerHTML = output;
	}

	function updateOutput(xmlDoc) {
		document.getElementById('out-summary').innerHTML = parseSummary(xmlDoc);
		$("button").click(function () { buttonHandler(this); });
		$("button").prop('disabled',false);
		$("input[name='tabset']").each(function() { updateTab(this.id.split('-')[1]); });
		$(document.getElementById('output-container')).show();
		return;
	}
	
	function handleFileSelect(evt) {
		var file = evt.target.files[0],
			reader = new FileReader(),
			prog = document.getElementById('progress');

		prog.value = 0;
		$(document.getElementById('output-container')).hide();
		$(document.getElementById('progress-container')).show();
		// Keep changelong visable to help with tab switches messing up the scroll position.
		//$(document.getElementById('changelog')).hide();
		reader.onloadstart = function (e) {
			prog.value = 20;
		};
		reader.onprogress = function (e) {
			if (e.lengthComputable) {
				var p = 20 + (e.loaded / e.total * 60);
				prog.value = p;
			}
		};
		reader.onload = function (e) {
			var xmlDoc = $.parseXML(e.target.result);
			prog.value = 100;
			updateOutput(xmlDoc);
			$(document.getElementById('progress-container')).hide();
		};
		reader.readAsText(file);
	}
	document.getElementById('file_select').addEventListener('change', handleFileSelect, false);
	// Run output immediately if an ID was given in the URL
	if ($.QueryString.hasOwnProperty("id")) {
		updateOutput();
	}
};