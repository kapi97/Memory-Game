var game_state = 0;

start_game = () => {

    let select_image_set_form = document.getElementById("select-images-sets").selectedIndex;
    let select_image_set_option_value = document.getElementsByTagName("option")[select_image_set_form].value;

    console.log(select_image_set_option_value);


    game_state = 1;

    if(select_image_set_option_value == 'images_set_one')
    {
        var images_set_picked = ["image-set-1-breaking-bad", "image-set-1-breaking-bad", 
                                "image-set-1-friends", "image-set-1-friends", 
                                "image-set-1-game-of-thrones", "image-set-1-game-of-thrones", 
                                "image-set-1-how-i-met-u-mother", "image-set-1-how-i-met-u-mother", 
                                "image-set-1-la-casa-de-papel", "image-set-1-la-casa-de-papel", 
                                "image-set-1-lucifer", "image-set-1-lucifer", 
                                "image-set-1-mr-robot", "image-set-1-mr-robot", 
                                "image-set-1-suits", "image-set-1-suits", 
                                "image-set-1-trailer-park-boys", "image-set-1-trailer-park-boys"];
        }

    if(select_image_set_option_value == 'images_set_two'){
        var images_set_picked = ["image-set-2-ford-mustang", "image-set-2-ford-mustang", 
                                "image-set-2-chevrolet-camaro", "image-set-2-chevrolet-camaro", 
                                "image-set-2-dodge-chalenger", "image-set-2-dodge-chalenger", 
                                "image-set-2-chevrolet-corvette-z06", "image-set-2-chevrolet-corvette-z06", 
                                "image-set-2-ferrari-enzo", "image-set-2-ferrari-enzo", 
                                "image-set-2-set-ibiza", "image-set-2-set-ibiza", 
                                "image-set-2-mazda-6", "image-set-2-mazda-6", 
                                "image-set-2-bmw-m2", "image-set-2-bmw-m2", 
                                "image-set-2-fiat-multipla", "image-set-2-fiat-multipla"];
    }    

    if(select_image_set_option_value == 'images_set_three'){
        var images_set_picked = ["image-set-3-colosesum", "image-set-3-colosesum", 
                                "image-set-3-eiffel-tower", "image-set-3-eiffel-tower", 
                                "image-set-3-flatiron", "image-set-3-flatiron", 
                                "image-set-3-great-sphinx", "image-set-3-great-sphinx", 
                                "image-set-3-statue-of-liberty", "image-set-3-statue-of-liberty", 
                                "image-set-3-sydney-opera-house", "image-set-3-sydney-opera-house", 
                                "image-set-3-taj-mahal", "image-set-3-taj-mahal", 
                                "image-set-3-tower-of-pisa", "image-set-3-tower-of-pisa", 
                                "image-set-3-white-house", "image-set-3-white-house"];
    }    
    
    let question_marks = document.querySelectorAll(".question-mark");
    question_marks = [...question_marks];

    question_marks.forEach(question_mark => {
        question_mark.style.display = "none";
    });


    document.getElementById("start-game-text-wrapper").style.display = "none"; 
    document.getElementById("won-game-text-wrapper").style.display = "none"; 
    document.getElementById("lost-game-text-wrapper").style.display = "none"; 

    document.getElementById("restart-game-button").style.display = "none";   
    document.getElementById("images-content-wrapper").style.display = "flex";  


    let cards = document.querySelectorAll(".image-wrapper");
    //nodes to array
    cards = [...cards];

    let game_time = 36;

    var game_counter = setInterval(function(){
        document.getElementById("game-timer").innerHTML = "TIME: " + game_time + " SEC";
        game_time = game_time - 1;

        if(game_state == 0){
            clearInterval( game_counter);
        }

        if(game_time == 0){
            document.getElementById("images-content-wrapper").style.display = "none";
            document.getElementById("lost-game-text-wrapper").style.display = "block";   
            clearInterval(game_counter);
        }

        if(game_time > 20){
            document.getElementById("game-timer").style.backgroundColor = "#1c3e36";
            document.getElementById("game-timer").style.color = "white";
        }

        if(game_time > 5 && game_time < 20){
            document.getElementById("game-timer").style.backgroundColor = "#b1a141";
        }

        if(game_time > -1 && game_time < 5){
            document.getElementById("game-timer").style.backgroundColor = "#a13f3f";
        }

        document.getElementById("game-timer").innerHTML = "TIME: " + game_time + " SEC";
    }, 1000);


    document.getElementsByClassName

    let active_card = "";
    const active_cards = [];

    const game_pairs = cards.length/2;
    let game_result = 0;


    const select_card = function(){
        active_card = this;

        if(active_card == active_cards[0]) return;

        active_card.classList.add("selected");
        active_card.classList.remove("hidden");

        if(active_cards.length === 0){
            active_cards[0] = active_card;
            return;
        }   
        
        else{
            cards.forEach(card => {
            card.removeEventListener("click", select_card);
        })

            active_cards[1] = active_card;

            setTimeout(function(){
                if(active_cards[0].className === active_cards[1].className)
                {
                    active_cards.forEach(active_card => {
                        active_card.classList.add("disabled")
                    });
                       
                        game_result++;

                        cards = cards.filter(card => !card.classList.contains("disabled"));
                        
                        if(game_result == game_pairs)
                        {   
                            clearInterval( game_counter);   

                            setTimeout(function(){
                            document.getElementById("images-content-wrapper").style.display="none";
                            document.getElementById("won-game-text-wrapper").style.display="block";
                            }, 1000);

                        }
                  
                }
                else{
                    active_cards.forEach(active_card => {
                        active_card.classList.add("hidden");
                    });
                }

                active_card = "";
                active_cards.length = 0;
                
                cards.forEach(card => card.addEventListener("click", select_card));


            }, 700);
        }

    }

const init = function () {  
    cards.forEach(card => {
        const position = Math.floor(Math.random() * images_set_picked.length);
        card.classList.add(images_set_picked[position]);
        images_set_picked.splice(position, 1);
    });

    setTimeout(function(){
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", select_card);

            question_marks.forEach(question_mark => {
                question_mark.style.display = "block";
            });

    })}, 3500);

    var delay_click = setInterval(function(){
        if(game_state == 0){      
                cards.forEach(card => {
                    card.removeEventListener("click", select_card);
            });
        }
    }, 1000);

}

    init();

    document.getElementById("start-game-button").disabled = true;  

    setTimeout(function(){
        document.getElementById("start-game-button").style.display = "none";
        document.getElementById("restart-game-button").style.display = "block";
    }, 3500);
 
}

restart_game = () => {
    game_state = 0;
    
    let cards = document.querySelectorAll(".image-wrapper");
    //nodes to array

    document.getElementById("won-game-text-wrapper").style.display = "none"; 
    document.getElementById("lost-game-text-wrapper").style.display = "none"; 
    document.getElementById("images-content-wrapper").style.display = "none"; 
    document.getElementById("start-game-text-wrapper").style.display = "block";  
 
    setTimeout(function() {
                document.getElementById("game-timer").innerHTML = "TIME: - SEC";    
                document.getElementById("game-timer").style.backgroundColor = "white";
            document.getElementById("game-timer").style.color = "black"; 
    }, 1000);
    
    let image_wrappers = document.querySelectorAll(".image-wrapper");

    image_wrappers.forEach(image_wrapper => {
        image_wrapper.className = 'image-wrapper';
    })

    document.getElementById("start-game-button").disabled = false;

    setTimeout(function(){
        document.getElementById("start-game-button").style.display = "block";  
        document.getElementById("restart-game-button").style.display = "none";  
    }, 1000);
	
}
