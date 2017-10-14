$(document).ready(function () {
	// Variables
	var container = $('#container');
	var character = $('#character');
	var obstacle = $('.obstacle');
	var obstacle_1 = $('#obstacle_1');
	var obstacle_2 = $('#obstacle_2');
	var score = $('#score');
	var speed_span = $('#shown_speed');
	var restart_btn = $('#restart');
	var start_btn = $('#start');
	// Initial Setup
	var container_width = parseInt(container.width());
	var speed = 10;
	var shown_speed = 0;
	var obstacle_initial_position = parseInt(obstacle.css('right'));
	var obstacle_initial_height = parseInt(obstacle.css('height'));
	var counter = 0;
	var container_height = parseInt(container.height());
	var character_height = parseInt(character.height());
	var character_left = parseInt(character.css('left'));
	var go_up = false;
	var score_updated = false;
	var game_over = false;
	// Begin Game
	var the_game = setInterval(function () {
		var character_top = parseInt(character.css('top'));
		if(collide(character, obstacle_1) || collide(character, obstacle_2) || character_top <= 0 || character_top > container_height - character_height) {
			stop_game();
		} else {
			var obstacle_current_position = parseInt(obstacle.css('right'));
			// Update score
			if (obstacle_current_position > container_width - character_left) {
				if (score_updated === false) {
					score.text(parseInt(score.text()) + 1);
					score_updated = true;
				}
			}
			// Check if obstacles are out of container
			if (obstacle_current_position > container_width) {
				var plus_or_minus = Math.round(Math.random()) * 2 - 1;
				var new_height = (parseInt(Math.random() * 100)) * plus_or_minus;
				// Change obstacle height
				obstacle_1.css('height', obstacle_initial_height + new_height);
				obstacle_2.css('height', obstacle_initial_height - new_height);
				// Increase speed
				speed = speed + 2;
				shown_speed = shown_speed + 1;
				speed_span.text(shown_speed);
				score_updated = false;
				obstacle_current_position = obstacle_initial_position;
			}
			// Move obstacles
			obstacle.css('right', (obstacle_current_position + speed)); 
			if (go_up === false) {
				go_down();
			}
	    }
	}, 40);
	// Character goes up when ENTER key is pressed down
	$(document).on("keydown", function (e) {
		var key = e.keyCode;
		if (key === 13 && go_up === false && game_over === false) {
			go_up = setInterval(go_upward, 50);
		}
	});
	// Character continues to fall when ENTER key is released
	$(document).on("keyup", function (e) {
		var key = e.keyCode;
		if (key === 13) {
			clearInterval(go_up);
			go_up = false;
		}
	});
	// Character goes down 5px
	function go_down() {
		character.css('top', parseInt(character.css('top')) + 5);
	}
	// Character goes up 8px
	function go_upward() {
		character.css('top', parseInt(character.css('top')) - 8);
	}
	// Function to stop game and show restart button
	function stop_game() {
		restart_btn.slideDown();
		game_over = true;
		//clearInterval(game_speed);
		clearInterval(the_game);	
	}
	// Button reloads the page with fresh game
	restart_btn.click(function () {
		location.reload();
	});
	// Function returns true when character collides 
	// with poles, top, or bottom of container
	function collide($div1, $div2) {
		var x1 = $div1.offset().left;
		var y1 = $div1.offset().top;
		var h1 = $div1.outerHeight(true);
		var w1 = $div1.outerWidth(true);
		var b1 = y1 + h1;
		var r1 = x1 + w1;
		var x2 = $div2.offset().left;
		var y2 = $div2.offset().top;
		var h2 = $div2.outerHeight(true);
		var w2 = $div2.outerWidth(true);
		var b2 = y2 + h2;
		var r2 = x2 + w2;
		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
			return true;
	}
});





