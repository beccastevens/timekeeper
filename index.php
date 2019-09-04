<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  <link rel="stylesheet" href="main.min.css">

  <title>Timekeeper</title>
</head>
<body>
  <div id="timeSheet" class="main">
    <h1 class="page-title">Time Keeper</h1>
    <div class="time-form">
      <label for="date">Date
        <input v-on:change="parseDateTime" v-model="newDate" type="text" id="date">
      </label>
      <label for="desc">Description
        <input v-model="newDesc" type="text" id="desc">
      </label>
      <label for="start">Start Time
        <input v-on:change="parseDateTime" v-model="newStart" type="text" id="start">
      </label>
      <label v-on:change="parseDateTime" for="end">End Time
        <input v-model="newEnd" type="text" id="end">
      </label>
      <label for="hours">Hours
        <input v-on:keypress.enter="addNew" v-model="newHours" type="number" id="hours" disabled>
      </label>
      <button v-on:click="addNew">Add a New Time Record</button>
      <span v-show="error" class="error">Oops! Please fill out all fields.</span>
      <span v-show="dateError" v-text="dateError" class="error"></span>
    </div>
    <table class="time-sheet">
      <caption>Time Sheet</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(time, index) in entries">
          <td>
            <button v-on:click="deleteEntry(index)" class="delete">X</button>
            {{ displayDate(time.entry_date) }}
          </td>
          <td>{{time.description}}</td>
          <!-- displayTime requires the time including date -->
          <td>{{ displayTime(time.entry_date +  ' ' + time.start_time) }}</td>
          <td>{{ displayTime(time.entry_date +  ' ' + time.end_time) }}</td>
          <td>{{time.hours}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">Total Hours</td>
          <td>{{totalHours}}</td>
        </tr>
      </tfoot>
    </table>
  </div>

  <script src="node_modules/moment/moment.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
