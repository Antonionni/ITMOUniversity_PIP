<%--
  Created by IntelliJ IDEA.
  User: anton
  Date: 19.12.17
  Time: 23:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Лабараторная №2</title>
    <style>
      <%@include file="resources/css/main.css"%>
    </style>
  </head>
  <body>
    <header>
      <div class="fio">Беллавин А.П.</div>
      <div class="group">группа: Р3201</div>
    </header>
  </body>
  <div class="main-wrapper" id="main-wrapper">
    <div class="plan" id="plan">
      <img src="resources/images/areas.png" id="area-image" draggable="false">
    </div>
    <div class="controls">
        <div class="y-cord">
          <label for="y-cord-input">Изменения Y:</label>
          <input type="text" id="y-cord-input" name="y-cord">
        </div>
        <div class="x-cord">
          <div class="input-lable">Изменения X:</div>
          <div class="input-container">
            <% for (int i = -5; i <= 3; i++) { %>
              <div>
                <label for="radio-<%=i%>"><%=i%></label>
                <input type="radio" id="radio-<%=i%>" value="<%=i%>" name="radio-buttons" class="radio-input">
              </div>
            <% } %>
          </div>
        </div>
        <div class="r-value">
          <div class="input-lable">Изменения R:</div>
          <div class="input-container" id="radiocb">
            <% for (int i = 1; i <= 5; ++i) { %>
            <div>
              <label for="box-<%=i%>"><%=i%></label>
              <input type="checkbox" id="box-<%=i%>" value="<%=i%>" class="box-input">
            </div>
            <% } %>
          </div>
        </div>
      <div class="buttons">
        <button id="button">Проверить</button>
      </div>
    </div>
  </div>
  <script type="text/javascript">
    <%@include file="resources/js/main.js"%>
  </script>
</html>
