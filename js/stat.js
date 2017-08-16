'use strict';

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
  ctx.fillStyle = fontColor;
  for (var i = 0; i < textArray.length; i++) {
    ctx.font = fontSize + 'px ' + font;
    ctx.textBaseline = 'hanging';
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
    if (names[j] === 'Вы') {
      ctx.fillStyle = playerColor;
    } else {
      ctx.fillStyle = otherPlayersColor.replace(/\d+(?=\))/, Math.random());
    }
    ctx.fillRect(leftPosition, topPosition, colWidth, verticalScaleCoefficient * times[j]);

    topPosition -= fontSize * lineHeightCoefficient;
    ctx.fillStyle = fontColor;
    ctx.fillText(Math.round(times[j]).toString(10), leftPosition, topPosition + linePaddingCoefficient * fontSize);

    leftPosition += (colWidth + colSpacing);
  }
};

var renderStatistics = function (ctx, names, times) {
  var cloudX = 100;
  var cloudY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;

  var cloudArrayX = [50, 70, 90, 110, 130, 150, 170, 180, 200, 240, 250, 270, 290, 310, 320, 330, 340, 360, 370, 380, 370, 380, 390, 400, 390, 380, 390, 400, 410, 420, 410, 400, 410, 400, 390, 370, 350, 330, 320, 310, 300, 280, 270, 260, 250, 240, 230, 220, 180, 170, 150, 140, 130, 120, 110, 90, 80, 70, 50, 60, 40, 20, 10, 0, 10, 0, 10, 20, 30, 40, 30, 20, 30, 40, 50, 40, 30, 40, 50];
  var cloudArrayY = [30, 20, 10, 0, 10, 20, 30, 20, 10, 20, 30, 40, 30, 40, 30, 40, 30, 40, 50, 70, 90, 100, 120, 130, 140, 150, 160, 170, 190, 200, 210, 220, 230, 240, 250, 240, 250, 240, 230, 240, 250, 240, 230, 240, 250, 260, 270, 260, 270, 260, 250, 260, 250, 260, 250, 240, 230, 250, 240, 250, 240, 230, 220, 210, 190, 180, 170, 160, 150, 140, 130, 110, 100, 90, 80, 70, 50, 40, 30];

  var shadowShiftX = 10;
  var shadowShiftY = 10;

  var cloudFillColor = 'rgba(255, 255, 255, 1)';
  var cloudStrokeColor = 'rgba(0, 0, 0, 1)';
  var shadowColor = 'rgba(0, 0, 0, 0.7)';

  var statisticsText = 'Ура вы победили!\nСписок результатов:';
  var font = 'PT Mono';
  var fontSize = 16;
  var fontColor = 'black';
  var lineHeightCoefficient = 1.2;
  var textArray = statisticsText.split('\n');

  var statisticsHeight = 150;
  var textHeight = Math.ceil(textArray.length * fontSize * lineHeightCoefficient);
  var verticalInnerPadding = (cloudHeight - textHeight - statisticsHeight) / 2;
  var horizontalInnerPadding = 50;
  var colWidth = 40;
  var colSpacing = 50;
  var playerColor = 'rgba(255, 0, 0, 1)';
  var otherPlayersColor = 'rgba(0, 0, 255, 1)';

  drawCloud(ctx, cloudX + shadowShiftX, cloudY + shadowShiftY, cloudArrayX, cloudArrayY, shadowColor, shadowColor);
  drawCloud(ctx, cloudX, cloudY, cloudArrayX, cloudArrayY, cloudStrokeColor, cloudFillColor);
  drawText(ctx, textArray, cloudX + horizontalInnerPadding, cloudY + verticalInnerPadding, font, fontColor, fontSize, lineHeightCoefficient);
  drawStatistics(ctx, names, times, cloudX + horizontalInnerPadding, cloudY + verticalInnerPadding + textHeight, cloudWidth - 2 * horizontalInnerPadding, cloudHeight - 2 * verticalInnerPadding - textHeight, colWidth, colSpacing, playerColor, otherPlayersColor, font, fontColor, fontSize, lineHeightCoefficient);

};
