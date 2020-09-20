const Minecraft = {
	_EXCEPTIONS: {
		INVALID_TOOL: 0,
		INVALID_INPUTS: 1,
		INVALID_OUTPUTS: 2
	},
	_BACKGROUNDS: {
		ERROR: "../image/missingno.png",
		CRAFTING_TABLE: "../image/missingno.png",
		CRAFTING_INVENTORY: "../image/missingno.png",
		FURNACE: "../image/missingno.png"
	},
	_ITEMS: {
		UNKNOWN: {img: "./image/missingno.png", url: "?page=items#missingno", name: "MissingNo."},
		FUEL: {img: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/58/Coal_JE4_BE3.png", url: "https://minecraft.gamepedia.com/Smelting#Fuel", name: "Fuel"},
		VANILLA: {
			REDSTONE_BLOCK: {img: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/26/Block_of_Redstone_JE2_BE2.png", url: "https://minecraft.gamepedia.com/Block_of_Redstone", name: "Block of Redstone"},
			NETHER_STAR: {img: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b3/Nether_Star.gif", url: "https://minecraft.gamepedia.com/Nether_Star", name: "Nether Star"}
		},
		BIOMESOPLENTY: {
			GEMORE_1: {img: "https://ftbwiki.org/images/1/13/Grid_Block_of_Amethyst_%28Biomes_O%27_Plenty%29.png", url: "https://ftbwiki.org/Block_of_Amethyst_(Biomes_O%27_Plenty)", name: "Block of Amethyst"}
		},
		BUILDCRAFTCORE: {
			ENGINEBLOCK_0: {img: "https://ftbwiki.org/images/4/4f/Grid_Redstone_Engine.png", url: "https://ftbwiki.org/Redstone_Engine", name: "Redstone Engine"},
			ENGINEBLOCK_1: {img: "https://ftbwiki.org/images/6/66/Grid_Stirling_Engine.png", url: "https://ftbwiki.org/Stirling_Engine", name: "Stirling Engine"},
			ENGINEBLOCK_2: {img: "https://ftbwiki.org/images/5/59/Grid_Combustion_Engine.png", url: "https://ftbwiki.org/Combustion_Engine", name: "Combustion Engine"},
		},
		BUILDCRAFTSILICON: {
			REDSTONECRYSTAL: {img: "https://ftbwiki.org/images/8/8c/Grid_Redstone_Crystal.png", url: "https://ftbwiki.org/Redstone_Crystal", name: "Redstone Crystal"}
		},
		CUSTOM: {
			ENGINE_BLOCK_MK1: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/blocks/engineblock1.png", url: "?page=items#engine_block_mk1", name: "Engine Block MK I"},
			ENGINE_BLOCK_MK2: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/blocks/engineblock2.png", url: "?page=items#engine_block_mk2", name: "Engine Block MK II"},
			ENGINE_BLOCK_MK3: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/blocks/engineblock3.png", url: "?page=items#engine_block_mk3", name: "Engine Block MK III"},
			ENGINE_BLOCK_MK4: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/blocks/engineblock4.png", url: "?page=items#engine_block_mk4", name: "Engine Block MK IV"},
			ENGINE_BLOCK_MK5: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/blocks/engineblock5.png", url: "?page=items#engine_block_mk5", name: "Engine Block MK V"},
			NETHER_STAR_BLOCK: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/blocks/netherstarblock.png", url: "?page=items#nether_star_block", name: "Nether Star Block"},
			CURRENCY_COPPER: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/items/currency_copper.png", url: "?page=items#currency_copper", name: "Copper Coin"},
			CURRENCY_ELECTRUM: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/items/currency_electrum.png", url: "?page=items#currency_electrum", name: "Electrum Coin"},
			CURRENCY_GOLD: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/items/currency_gold.png", url: "?page=items#currency_gold", name: "Gold Coin"},
			CURRENCY_PLATINUM: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/items/currency_platinum.png", url: "?page=items#currency_platinum", name: "Platinum Coin"},
			CURRENCY_SILVER: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/items/currency_silver.png", url: "?page=items#currency_silver", name: "Silver Coin"},
			TOOL_BANNHAMMER: {img: "https://raw.githubusercontent.com/pr0LebenImHolz/LiH-Resourcepack/master/assets/minecraft/textures/items/tool_bannhammer.png", url: "?page=items#tool_bannhammer", name: "Bannhammer"}
		},
		THAUMCRAFT: {
			ITEMELDRITCHOBJECT: {img: "https://ftbwiki.org/images/e/e2/Grid_Primordial_Pearl.gif", url: "https://ftbwiki.org/Primordial_Pearl", name: "Primordial Pearl"}
		}
	},
	parseRecipe(tool, inputs, outputs) {
		function parseItem(item) {
			var _item = item.split(":");
			item = Minecraft._ITEMS[_item[0].toUpperCase()];
			if (_item.length === 2) item = item[_item[1].toUpperCase()];
			if (!item) item = Minecraft._ITEMS.UNKNOWN;
			item = "<a href=\"%h\" title=\"%t\"><img src=\"%i\" alt=\"%a\" /></a>"
				.replace("%h", item.url)
				.replace("%t", item.name)
				.replace("%i", item.img)
				.replace("%a", item.name[0]);
			return item;
		}
		try {
			switch (tool) {
				case "crafting-table":
					if (inputs.length !== 9) throw Minecraft._EXCEPTIONS.INVALID_INPUTS;
					if (outputs.length !== 1) throw Minecraft._EXCEPTIONS.INVALID_OUTPUTS;
					var recipe = `<div class="title">Crafting</div><table class="inputs"><tbody><tr>`;
					for(var i = 0; i < inputs.length; i++) {
						if (inputs[i]) {
							recipe += "<td>" + parseItem(inputs[i]) + "</td>";
						}
						else {
							recipe += "<td></td>";
						}
						if (i === 2 || i === 5) recipe += "</tr>";
					}
					recipe += `</tr></tbody></table><div class="arrow" /><div class="outputs">${parseItem(outputs[0])}</div>`;
					return recipe;
				case "crafting-inventory":
					if (inputs.length === 0 || inputs.length > 4) throw Minecraft._EXCEPTIONS.INVALID_INPUTS;
					if (outputs.length !== 1) throw Minecraft._EXCEPTIONS.INVALID_OUTPUTS;
					var recipe = `<div class="title">Crafting</div><table class="inputs"><tbody><tr>`;
					throw null;
					return recipe;
				case "furnace":
					if (inputs.length !== 1) throw Minecraft._EXCEPTIONS.INVALID_INPUTS;
					if (outputs.length !== 1) throw Minecraft._EXCEPTIONS.INVALID_OUTPUTS;
					var recipe = `<div class="title">Smelting</div><div class="inputs">${parseItem(inputs[0])}<div class="flame" />${parseItem("fuel")}</div><div class="arrow" /><div class="outputs">${parseItem(outputs[0])}</div>`;
					return recipe;
				default:
					throw Minecraft._EXCEPTIONS.INVALID_TOOL;
			}
		}
		catch (e) {
			switch (e) {
				case Minecraft._EXCEPTIONS.INVALID_TOOL:
					console.error("Error while parsing recipe: Unknown recipe");
					recipe = $(`<div class="recipe" style="background-image:url(${Minecraft._BACKGROUNDS.ERROR})">`);
					return $(`<div class="recipe" style="background-image:url(${Minecraft._BACKGROUNDS.ERROR})">`);
				case Minecraft._EXCEPTIONS.INVALID_INPUTS:
					console.error("Error while parsing recipe: Invalid inputs");
					recipe = $(`<div class="recipe" style="background-image:url(${Minecraft._BACKGROUNDS.ERROR})">`);
					return $(`<div class="recipe" style="background-image:url(${Minecraft._BACKGROUNDS.ERROR})">`);
				case Minecraft._EXCEPTIONS.INVALID_OUTPUTS:
					console.error("Error while parsing recipe: Invalid outputs");
					return $(`<div class="recipe" style="background-image:url(${Minecraft._BACKGROUNDS.ERROR})">`);
				default:
					throw e;
			}
		}
	}
}