<%@ page import="models.ResponseInfo" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.google.gson.Gson" %>
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
      <div class="result_list">
        <div class="result_list_header">
          <div class="result_list_cell">Координата X</div>
          <div class="result_list_cell">Координата Y</div>
          <div class="result_list_cell">Значение R</div>
          <div class="result_list_cell">Попадание</div>
        </div>
        <div class="result_list_content" id="list-wrapper">
          <%
            ArrayList<ResponseInfo> results = (ArrayList<ResponseInfo>) session.getAttribute("resultArray");
            if (results == null) {
              results = new ArrayList<ResponseInfo>();
              session.setAttribute("results", results);
            }

            String resultJson = new Gson().toJson(results);
            for (ResponseInfo result : results) {
              String isHitting = result.isHitting ? "Попал" : "Непопал";
          %>
            <div class="result_list_row">
              <div class="result_list_cell"><%=String.format("%.2f", result.xValue)%></div>
              <div class="result_list_cell"><%=String.format("%.2f", result.yValue)%></div>
              <div class="result_list_cell"><%=result.rValue%></div>
              <div class="result_list_cell"><%=isHitting%></div>
            </div>
          <% } %>
        </div>
      </div>
    </div>
  </body>
  <script type="text/javascript">
    var resultArray = <%=resultJson%>;
    <%@include file="resources/js/main.js"%>
  </script>
</html>
