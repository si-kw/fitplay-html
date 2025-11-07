document.addEventListener("DOMContentLoaded", () => {
	"use strict";

	const selectHeader = $("#header");
	const selectMain = $("#main");
	function headerFixed() {
		if (selectHeader.length) {
			const headerOffset = selectHeader.offset().top;
			if (window.scrollY > headerOffset) {
				selectHeader.addClass("sticked");
			}
		}
	}
	// Adjust main section margin based on sticky header
	function adjustMainMargin() {
		if (selectHeader.hasClass("sticked")) {
			const headerHeight = selectHeader.outerHeight();
			selectMain.css("margin-top", headerHeight + "px");
		}
	}

	// Make header sticky on scroll

	// Run on scroll and resize
	$(window).on("scroll resize", function () {
		headerFixed();
		adjustMainMargin();
	});

	// Initial setup
	headerFixed();
	adjustMainMargin();

	// --- Start & End Date Pickers ---
	if ($("#startDate").length && $("#endDate").length) {
		function getOrdinal(n) {
			const s = ["th", "st", "nd", "rd"],
				v = n % 100;
			return n + (s[(v - 20) % 10] || s[v] || s[0]);
		}

		function setupFancyDatePicker(selector) {
			flatpickr(selector, {
				dateFormat: "d-m-Y",
				altInput: true,
				onValueUpdate: function (selectedDates, dateStr, instance) {
					if (selectedDates.length > 0) {
						const date = selectedDates[0];
						const day = date.getDate();
						const month = date.toLocaleString("default", {
							month: "long",
						});
						const year = date.getFullYear();
						instance._input.value = `${getOrdinal(
							day
						)} ${month} ${year}`;
					}
				},
			});
		}

		setupFancyDatePicker("#startDate");
		setupFancyDatePicker("#endDate");
	}

	// --- Date of Birth Picker ---
	if ($("#dob").length) {
		function getOrdinal(n) {
			const s = ["th", "st", "nd", "rd"],
				v = n % 100;
			return n + (s[(v - 20) % 10] || s[v] || s[0]);
		}

		function setupFancyDatePicker(selector) {
			flatpickr(selector, {
				dateFormat: "d-m-Y",
				altInput: true,
				maxDate: "today",
				onValueUpdate: function (selectedDates, dateStr, instance) {
					if (selectedDates.length > 0) {
						const date = selectedDates[0];
						const day = date.getDate();
						const month = date.toLocaleString("default", {
							month: "long",
						});
						const year = date.getFullYear();
						instance._input.value = `${getOrdinal(
							day
						)} ${month} ${year}`;
					}
				},
			});
		}

		setupFancyDatePicker("#dob");
	}

	// --- Time Pickers ---
	function initTimePickers() {
		flatpickr(".timepicker", {
			enableTime: true,
			noCalendar: true,
			dateFormat: "h:i K",
			defaultDate: new Date(),
			minuteIncrement: 15,
			allowInput: true,
		});
	}

	$(document).ready(function () {
		initTimePickers();

		// Add new schedule block
		$("#addSchedule").click(function () {
			const newItem = $(".schedule-item").first().clone();
			newItem.find("select").val("");
			newItem.find("input").val("");
			$("#scheduleWrapper").append(newItem);
			initTimePickers();
		});

		// Remove schedule block
		$(document).on("click", ".removeSchedule", function () {
			if ($(".schedule-item").length > 1) {
				$(this).closest(".schedule-item").remove();
			} else {
				alert("At least one schedule is required.");
			}
		});
	});

	// --- Add & Remove Packages ---
	$("#addPackage").click(function () {
		const newItem = $(".package-item").first().clone();
		newItem.find("input").val("");
		$("#packageWrapper").append(newItem);
	});

	$(document).on("click", ".removePackage", function () {
		if ($(".package-item").length > 1) {
			$(this).closest(".package-item").remove();
		} else {
			alert("At least one package is required.");
		}
	});

	// --- Back Button Functionality ---
	const backButton = document.querySelector(".header-back a");
	if (backButton) {
		backButton.addEventListener("click", function (e) {
			e.preventDefault();
			if (window.history.length > 1) {
				window.history.back();
			} else {
				window.location.href = "index.html";
			}
		});
	}
});
