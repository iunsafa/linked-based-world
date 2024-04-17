class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Body); 
        
        if (locationData.Choices && locationData.Choices.length > 0) { // Check if the location has any choices
            for (let choice of locationData.Choices) { // Loop over the location's choices
                // Check if the choice is available based on certain conditions
                if (this.isChoiceAvailable(choice)) {
                    this.engine.addChoice(choice.Text, choice); // Add the choice
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    isChoiceAvailable(choice) {
        // Check if the choice requires an ID card and if the player has obtained it
        if (choice.RequireIDCard && !this.engine.storyData.PlayerHasIDCard) {
            return false; // Hide the choice if ID card is required but not obtained
        }
        return true; 
    }

    handleChoice(choice) {
        if (choice && choice.Target === "Card Obtained") {
            this.engine.storyData.PlayerHasIDCard = true;
        }
        if (choice) {
            this.engine.show("&gt; " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
