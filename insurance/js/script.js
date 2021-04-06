function toggleDataPage(isShow, index) {
    if (isShow) {
        $(".data-page").css("top", "0");
        $(".toolbar").removeClass("d-none");
        $(".data-page").css("left", (-100 * index) + "vw");
        setTimeout(function() {
            $(".return-row").removeClass("d-none");
        }, 300);
    }
    else {
        $(".data-page").css("top", "100vh");
        $(".toolbar").addClass("d-none");
        $(".return-row").addClass("d-none");
    }
}

function calcTotal(field) {
    var yearTotal = 0;
    var monthTotal = 0;

    field.closest("tbody").find("tr:not(.table-subtitle):not(.sum)").each(function() {
        var year = $(this).find("td:nth-child(2) input").val();
        var month = $(this).find("td:nth-child(3) input").val();
        console.log("year" + year);

        yearTotal += (year.toString().trim() === "") ? 0 : parseFloat(year);
        monthTotal += (month.toString().trim() === "") ? 0 : parseFloat(month);
    });
    console.log("total" + yearTotal);
    field.closest("tr").siblings(".sum").find("td:nth-child(2) p").text(yearTotal.toLocaleString("en"));
    field.closest("tr").siblings(".sum").find("td:nth-child(3) p").text(monthTotal.toLocaleString("en"));


    field.closest("tbody").find("tr:not(.table-subtitle):not(.sum)").each(function() {
        var year = parseInt($(this).find("td:nth-child(2) input").val()) || 0;
        var yearPercentage = $(this).find("td:last-child p");
        var percentage = parseFloat(((year / yearTotal) * 100).toFixed(2));

        yearPercentage.text(percentage + "%");
    });
}

$(function() {
    $(".home-page button").on("click", function(e) {
        e.preventDefault();
        $("body").css("overflow", "auto")
        $("body").animate({ scrollTop: $(document).height() }, 1000);
        setTimeout($("body").css("overflow", "hidden"));
    });

    $(".item").on("click", function() {
        var text = $(this).find("p").text();
        var index = 0;
        if (text === "支出") index = 1;
        else if (text === "資產") index = 2;
        else if (text === "負債") index = 3;

        toggleDataPage(true, index);
    });

    $(".toolbar .text").on("click", function() {
        var left = $(this).index() * -100;
        var target = $(this).attr("target");

        $(".data-page").css("left", left + "vw");
    });

    $(".data-page .return-btn").on("click", function() {
        toggleDataPage(false);
    });

    $("table tbody input[type='text']").on("enter, blur", function() {
        var isMonth = $(this).parent().index() === 2;
        if ($(this).val().trim() !== "") {
            if (isMonth) {
                $(this).parent().prev().find("input").val(parseInt($(this).val()) * 12);
            }
            else {
                $(this).parent().next().find("input").val(parseFloat((parseInt($(this).val()) / 12).toFixed(2)));
            }
        }
        var yearTotal = 0;
        var monthTotal = 0;
        var field = $(this);

        setTimeout(function() {
            calcTotal(field);
        });
    });

    $("#btnExport").click(function(e) {
		var a = document.createElement('a');
		var data_type = 'data:application/vnd.ms-excel';
		var table_div = $('#dvData');
		var table_html = table_div.prop("outerHTML");
        console.log(encodeURI(table_html));
		a.href = data_type + ', ' + encodeURIComponent(table_html);
		a.download = 'filename.xls';
		a.click();
		e.preventDefault();
	  });
});
