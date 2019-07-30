/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});
			
		}
	
	// Gallery - popunder
	$('.thumbnail').viewbox();
	
	// GitHub stats from API v3
	$.getJSON('https://api.github.com/repos/mdtrooper/Fallen-leaves/contributors', function(data) {
		let amount_contributors = data.length;
		
		let amount_commits = 0;
		for (contributor of data) {
			amount_commits += contributor.contributions
		}
		$("#developers").html(amount_contributors);
		$("#commits").html(amount_commits);
	});
	
	$.getJSON('https://api.github.com/repos/mdtrooper/Fallen-leaves/tags', function(data) {
		let amount_releases = data.length;
		$("#releases").html(amount_releases);
	});
	
	$.getJSON('https://api.github.com/repos/mdtrooper/Fallen-leaves/issues?state=open', function(data) {
		let amount_open_issues = data.length;
		
		$.getJSON('https://api.github.com/repos/mdtrooper/Fallen-leaves/issues?state=all', function(data) {
			let amount_all_issues = data.length;
			$("#issues").html(amount_open_issues + " / " + amount_all_issues);
		});
	});
	
	$.getJSON('https://api.github.com/repos/mdtrooper/Fallen-leaves/branches', function(data) {
		let amount_branches = data.length;
		$("#branches").html(amount_branches);
	});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);
