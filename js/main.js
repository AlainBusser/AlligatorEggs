// Generated by CoffeeScript 1.9.0
(function() {
  var color_tab, debug, id, nb_exemple, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Array.prototype.unique = function() {
    var key, output, value, _i, _ref, _results;
    output = {};
    for (key = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; key = 0 <= _ref ? ++_i : --_i) {
      output[this[key]] = this[key];
    }
    _results = [];
    for (key in output) {
      value = output[key];
      _results.push(value);
    }
    return _results;
  };

  nb_exemple = 9;

  _ref = [true, 1000], debug = _ref[0], id = _ref[1];

  color_tab = ['purple', 'blue', 'LightBlue', 'red', 'orange', 'brown', 'green', 'LightGreen', 'yellow', 'pink', 'grey'];

  $(function() {
    var color, i, make_it_droppable, make_root_droppable, _i, _j, _len;
    for (i = _i = 1; 1 <= nb_exemple ? _i <= nb_exemple : _i >= nb_exemple; i = 1 <= nb_exemple ? ++_i : --_i) {
      $("#buttons-panel").append("<button id='ex-" + i + "' class='load-example' data-div='exemple-" + i + "'>Ex " + i + "</button>");
    }
    for (_j = 0, _len = color_tab.length; _j < _len; _j++) {
      color = color_tab[_j];
      $("#choose-color").append("<div class='color' style='background-color:" + color + ";' data-color='" + color + "'></div>");
      $("#preloaded-images").append("<img src='css/img/vieil-alligator-" + color + ".png' width='1' height='1' /><img src='css/img/alligator-" + color + ".png' width='1' height='1' /><img src='css/img/egg-" + color + ".png' width='1' height='1' />");
    }
    $(".color").on("click", function() {
      $("#choose-color").data("color", $(this).data("color"));
      $(".color").removeClass("selected-color");
      $(this).addClass("selected-color");
      if (debug) {
        return console.log("You choose " + $("#choose-color").data("color"));
      }
    });
    $(".item").draggable({
      helper: "clone",
      appendTo: "#buttons-panel"
    });
    make_it_droppable = function() {
      return $(".application_drop, .definition_drop").droppable({
        hoverClass: "ui-state-hover",
        accept: ".croco, .vieux-croco, .egg",
        drop: function(event, ui) {
          var lambda, variable;
          $(this).parent(":first").removeClass("parentHighlight");
          if (ui.draggable.hasClass("vieux-croco")) {
            variable = 'white';
          } else {
            variable = $("#choose-color").data("color");
          }
          if (ui.draggable.hasClass("croco") || ui.draggable.hasClass("vieux-croco")) {
            lambda = "<div id='" + (id++) + "' style='background: url(css/img/alligator-" + variable + ".png) top center no-repeat;' class='lambda dropped' data-variable='" + variable + "' >\n<div class='definition_drop'></div>\n<div class='application_drop'></div>\n</div>";
          } else {
            lambda = "<div id='" + (id++) + "' style='background: url(css/img/egg-" + variable + ".png) top center no-repeat;' class='variable dropped' data-variable='" + variable + "' >\n<div class='application_drop'></div>\n</div>";
          }
          if ($(this).hasClass("definition_drop")) {
            $(this).before(lambda);
          } else {
            $(this).parent().after(lambda);
          }
          $(this).remove();
          if (debug) {
            console.log("a " + $(lambda).data("variable") + " has been dropped !");
          }
          return make_it_droppable();
        }
      });
    };
    make_root_droppable = function() {
      return $("#root").droppable({
        hoverClass: "ui-state-hover",
        accept: ".croco, .vieux-croco",
        drop: function(event, ui) {
          var lambda, variable;
          if (ui.draggable.hasClass("croco")) {
            variable = $("#choose-color").data("color");
          } else {
            variable = 'white';
          }
          lambda = " <div id='" + (id++) + "' style='background: url(css/img/alligator-" + variable + ".png) top center no-repeat;' class='lambda dropped' data-variable='" + variable + "' >\n   <div class='definition_drop'></div>\n   <div class='application_drop'></div>\n</div>";
          $(this).append(lambda).droppable("destroy");
          if (debug) {
            console.log("a " + $(lambda).data("variable") + " has been dropped !");
          }
          return make_it_droppable();
        }
      });
    };
    make_root_droppable();
    $("#clear").on("click", function() {
      $("#root").empty();
      return make_root_droppable();
    });
    $("#go").on("click", function() {
      var ahead_color, application_clone, application_content, bust_a_move, color_rule_check, current_color, delay, interval, pointer, variable;
      $(".application_drop, .definition_drop").remove();
      ahead_color = ['white'];
      pointer = $("#root > .lambda:first");
      while (!pointer.siblings().length || pointer.data("variable") === 'white') {
        current_color = pointer.data("variable");
        ahead_color.push(current_color);
        if (pointer.data("variable") !== "white") {
          pointer = pointer.find(".lambda").first();
          if (!pointer.length) {
            alert("Là ça change pas !");
            break;
          }
        } else {
          if (pointer.children().length === 1) {
            alert("creve pourriture communiste !");
            pointer.after(pointer.children());
            pointer.remove();
            pointer = $("#root > .lambda:first");
          } else {
            pointer = pointer.find(".lambda").first();
          }
        }
      }
      ahead_color = ahead_color.unique();
      variable = pointer.data("variable");
      color_rule_check = function(func, app) {
        var app_colors, app_items, difference, func_colors, get_colors, index, item, new_color, used_colors, _k, _l, _len1, _len2, _results;
        get_colors = function(tree) {
          var palette;
          palette = [];
          tree.find("[data-variable]").andSelf().filter("[data-variable]").each(function() {
            return palette.push($(this).data("variable"));
          });
          return palette.unique();
        };
        func_colors = get_colors(func);
        _results = [];
        for (_k = 0, _len1 = func_colors.length; _k < _len1; _k++) {
          color = func_colors[_k];
          app_items = app.find("[data-variable='" + color + "']").andSelf().filter("[data-variable='" + color + "']");
          if (app_items.length) {
            alert("Règle de la couleur !");
            app_colors = get_colors(app);
            used_colors = (func_colors.concat(app_colors.concat(ahead_color))).unique();
            difference = (function() {
              var _l, _len2, _results1;
              _results1 = [];
              for (_l = 0, _len2 = color_tab.length; _l < _len2; _l++) {
                item = color_tab[_l];
                if (__indexOf.call(used_colors, item) < 0) {
                  _results1.push(item);
                }
              }
              return _results1;
            })();
            difference = difference.slice(0, +(app_colors.length - 1) + 1 || 9e9);
            for (index = _l = 0, _len2 = difference.length; _l < _len2; index = ++_l) {
              new_color = difference[index];
              app.find("[data-variable=" + app_colors[index] + "]").andSelf().filter("[data-variable=" + app_colors[index] + "]").each(function() {
                var _ref1;
                if (_ref1 = $(this).attr("data-variable"), __indexOf.call(ahead_color, _ref1) < 0) {
                  $(this).attr("data-variable", new_color);
                  if ($(this).hasClass("lambda")) {
                    $(this).css({
                      "background-image": "url(css/img/alligator-" + new_color + ".png)"
                    });
                  } else {
                    $(this).css({
                      "background-image": "url(css/img/egg-" + new_color + ".png)"
                    });
                  }
                  return $(this).css({
                    "background-position": "top center no-repeat;"
                  });
                }
              });
            }
            alert("C'est vu ?");
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      application_content = pointer.siblings().first();
      color_rule_check(pointer, application_content);
      application_clone = application_content.clone();
      delay = function(ms, func) {
        return setTimeout(func, ms);
      };
      interval = function(ms, func) {
        return setInterval(func, ms);
      };
      bust_a_move = function(timer, croco) {
        var bustit, images, j;
        j = 1;
        images = ["alligator", "vieil-alligator"];
        bustit = interval(250, function() {
          j = j + 1;
          console.log(croco.data("variable"));
          return croco.css({
            'zIndex': '1000',
            "background-image": "url(css/img/" + images[j % 2] + "-" + variable + ".png)",
            "background-position": "top center no-repeat"
          });
        });
        return delay(timer, function() {
          clearInterval(bustit);
          return croco.css({
            "zIndex": "initial",
            "background-image": "url(css/img/alligator-" + variable + ".png)",
            "background-position": "top center no-repeat"
          });
        });
      };
      bust_a_move(4000, pointer);
      return application_content.css('visibility', 'hidden').clone().prependTo(pointer).css({
        border: "dashed black 10px",
        visibility: "visible",
        position: "absolute",
        top: "0px",
        left: "100%"
      }).animate({
        "min-width": "0px",
        padding: "0px",
        height: '50px',
        width: "50px",
        top: "50px",
        left: "70%"
      }, 4000, function() {
        var definition_content;
        $(this).remove();
        application_content.remove();
        pointer.find(".variable[data-variable=" + variable + "]").each(function() {
          $(this).after(application_clone.clone());
          return $(this).remove();
        });
        definition_content = pointer.contents();
        pointer.after(definition_content);
        return pointer.remove();
      });
    });
    $(".run-previous-code").on("click", function() {
      var js;
      js = CoffeeScript.compile($(this).prev(":first").text());
      return eval(js);
    });
    return $(".load-example").on("click", function() {
      var div;
      div = $(this).attr("data-div");
      return $("#root").empty().append($("#" + div).html());
    });
  });

}).call(this);
