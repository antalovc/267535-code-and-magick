'use strict';

window.renderStatistics = function (ctx, names, times) {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;

  var CLOUD_X_ARRAY = [50, 70, 90, 110, 130, 150, 170, 180, 200, 240, 250, 270, 290, 310, 320, 330, 340, 360, 370, 380, 370, 380, 390, 400, 390, 380, 390, 400, 410, 420, 410, 400, 410, 400, 390, 370, 350, 330, 320, 310, 300, 280, 270, 260, 250, 240, 230, 220, 180, 170, 150, 140, 130, 120, 110, 90, 80, 70, 50, 60, 40, 20, 10, 0, 10, 0, 10, 20, 30, 40, 30, 20, 30, 40, 50, 40, 30, 40, 50];
  var CLOUD_Y_ARRAY = [30, 20, 10, 0, 10, 20, 30, 20, 10, 20, 30, 40, 30, 40, 30, 40, 30, 40, 50, 70, 90, 100, 120, 130, 140, 150, 160, 170, 190, 200, 210, 220, 230, 240, 250, 240, 250, 240, 230, 240, 250, 240, 230, 240, 250, 260, 270, 260, 270, 260, 250, 260, 250, 260, 250, 240, 230, 250, 240, 250, 240, 230, 220, 210, 190, 180, 170, 160, 150, 140, 130, 110, 100, 90, 80, 70, 50, 40, 30];

  var SHADOW_X_SHIFT = 10;
  var SHADOW_Y_SHIFT = 10;

  var CLOUD_COLOR_FILL = 'rgba(255, 255, 255, 1)';
  var CLOUD_COLOR_STROKE = 'rgba(0, 0, 0, 1)';
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  var FONT = 'PT Mono';
  var FONT_SIZE = 16;
  var FONT_COLOR = 'black';
  var LINE_HEIGHT_COEFFICIENT = 1.2;
  var STATISTICS_TEXT_ARRAY = ['Ура вы победили!', 'Список результатов:'];

  var STATISTICS_HEIGHT = 150;
  var HORIZONTAL_INNER_PADDING = 50;
  var COL_WIDTH = 40;
  var COL_SPACING = 50;
  var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var OTHER_PLAYERS_COLOR = 'rgba(0, 0, 255, 1)';

  var textHeight = Math.ceil(STATISTICS_TEXT_ARRAY.length * FONT_SIZE * LINE_HEIGHT_COEFFICIENT);
  var verticalInnerPadding = (CLOUD_HEIGHT - textHeight - STATISTICS_HEIGHT) / 2;
  var innerStatisticsX = CLOUD_X + HORIZONTAL_INNER_PADDING;

  var drawCloud = function (ctx, x, y, arrayX, arrayY, strokeColor, fillColor) {
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;

    ctx.moveTo(arrayX[0], arrayY[0]);
    ctx.beginPath();
    for (var i = 0; i < arrayX.length - 1; i++) {
      ctx.lineTo(x + arrayX[i], y + arrayY[i]);
      ctx.lineTo(x + arrayX[i + 1], y + arrayY[i]);
    }
    ctx.closePath();

    ctx.stroke();
    ctx.fill();
  };

  var drawText = function (ctx, textArray, x, y, font, fontColor, fontSize, lineHeightCoefficient) {
    var linePaddingCoefficient = (lineHeightCoefficient - 1) > 0 ? (lineHeightCoefficient - 1) / 2 : 0;
    ctx.fillStyle = fontColor || '#000000';
    ctx.font = fontSize + 'px ' + font;
    ctx.textBaseline = 'hanging';
    for (var i = 0; i < textArray.length; i++) {
      ctx.fillText(textArray[i], x, y + i * Math.ceil(fontSize * lineHeightCoefficient) + Math.ceil(fontSize * linePaddingCoefficient));
    }
  };

  var drawStatistics = function (ctx, names, times, x, y, width, height, colWidth, colSpacing, playerColor, otherPlayersColor, font, fontColor, fontSize, lineHeightCoefficient) {
    var horizontalPadding = (width - names.length * colWidth - (names.length - 1) * colSpacing) / 2;
    var columnsHeight = height - fontSize * 2 * lineHeightCoefficient;
    var linePaddingCoefficient = (lineHeightCoefficient - 1) > 0 ? (lineHeightCoefficient - 1) / 2 : 0;

    var maxTime = 0;
    for (var i = 0; i < times.length; i++) {
      if (maxTime < times[i]) {
        maxTime = times[i];
      }
    }
    var verticalScaleCoefficient = columnsHeight / maxTime;
    var leftPosition = x + horizontalPadding;
    var topPosition = 0;
    ctx.textBaseline = 'hanging';
    ctx.font = fontSize + 'px ' + font;
    for (var j = 0; j < names.length; j++) {
      topPosition = y + height - fontSize * lineHeightCoefficient;
      ctx.fillStyle = fontColor;
      ctx.fillText(names[j], leftPosition, topPosition + linePaddingCoefficient * fontSize);

      topPosition -= verticalScaleCoefficient * times[j];
      ctx.fillStyle = (names[j] === 'Вы') ? playerColor : otherPlayersColor.replace(/\d+\.?\d*(?=\))/, +Math.random().toFixed(1));

      ctx.fillRect(leftPosition, topPosition, colWidth, verticalScaleCoefficient * times[j]);

      topPosition -= fontSize * lineHeightCoefficient;
      ctx.fillStyle = fontColor;
      ctx.fillText(Math.round(times[j]).toString(10), leftPosition, topPosition + linePaddingCoefficient * fontSize);

      leftPosition += (colWidth + colSpacing);
    }
  };

  drawCloud(ctx, CLOUD_X + SHADOW_X_SHIFT, CLOUD_Y + SHADOW_Y_SHIFT, CLOUD_X_ARRAY, CLOUD_Y_ARRAY, SHADOW_COLOR, SHADOW_COLOR);
  drawCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_X_ARRAY, CLOUD_Y_ARRAY, CLOUD_COLOR_STROKE, CLOUD_COLOR_FILL);
  drawText(ctx, STATISTICS_TEXT_ARRAY, innerStatisticsX, CLOUD_Y + verticalInnerPadding, FONT, FONT_COLOR, FONT_SIZE, LINE_HEIGHT_COEFFICIENT);
  drawStatistics(ctx, names, times, innerStatisticsX, CLOUD_Y + verticalInnerPadding + textHeight, CLOUD_WIDTH - 2 * HORIZONTAL_INNER_PADDING, CLOUD_HEIGHT - 2 * verticalInnerPadding - textHeight, COL_WIDTH, COL_SPACING, PLAYER_COLOR, OTHER_PLAYERS_COLOR, FONT, FONT_COLOR, FONT_SIZE, LINE_HEIGHT_COEFFICIENT);

};
