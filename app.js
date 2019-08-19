const times = [
  {
    'date': '2018-12-20',
    'description': 'Read book',
    'startTime': '9:30 am',
    'endTime': '4:00 pm',
    'hours': 6.5
  },
  {
    'date': '2018-12-21',
    'description': 'Algebra',
    'startTime': '9:30 am',
    'endTime': '3:00 pm',
    'hours': 5.5
  },
  {
    'date': '2018-12-22',
    'description': 'Wrote journal response',
    'startTime': '9:00 am',
    'endTime': '3:00 pm',
    'hours': 5
  },
  {
    'date': '2018-12-23',
    'description': 'Planning science project',
    'startTime': '9:30 am',
    'endTime': '1:00 pm',
    'hours': 3.5
  },
]

new Vue({
  el: '#timeSheet',
  data: {
    times: times,
    newDate: '',
    newDesc: '',
    newStart: '',
    newEnd: '',
    newHours: 0,
    error: false,
    dateError: false
  },
  methods: {
    addNew: function(){
      if(!this.newData || !this.newDesc || !this.newHours) {
        this.error = true;
      } else {
        this.times.push({
          date: stringDate,
          description: this.newDesc,
          startTime: stringStart,
          endTime: stringEnd,
          hours: this.newHours
        });
        this.newDate = '';
        this.newDesc = '';
        this.newStart = '';
        this.newEnd = '';
        this.newHours = '';
        this.error = false;
      }
    },
    parseDateTime: function(){
      var date = moment(this.newDate);
      stringDate = date.format('YYYY-MM-DD');

      var start = moment(stringDate + ' ' + this.newStart);
      stringStart = start.format('h:mm a');

      var end = moment(stringDate + ' ' + this.newEnd);
      stringEnd = end.format('h:mm a');

      if( date.isValid() && start.isValid() && end.isValid() ) {
        var hours = end.diff(start, 'hours', true);
        this.dateError = false;

        if(hours > 0) {
          this.newHours = hours;
          this.dateError = false;
        } else if(hours < 0 && this.newEnd.length > 0) {
          this.newHours = '';
          this.dateError = 'Start time must be earlier than end time';
        } else {
          this.newHours = '';
          this.dataError = false;
        }
      } else {
        if(!date.isValid()) {
          this.dateError = 'Date format is unrecognized';
        } else if(!start.isValid()) {
          this.dateError = 'Start time not recognized';
        } else if(!end.isValid()) {
          this.dateError = 'End time is not recognized';
        } else {
          this.dateError = 'Unknown error, please clear form and try again';
        }
      }
    },
    deleteEntry: function(index) {
      if (confirm('Are you sure you want to delete this entry?')) {
          times.splice(index,1);
      } else {
          // Do nothing!
      }
    },
    displayDate: function(date){
      var displayDate = moment(date).format('MMM D, YYYY');
      return displayDate;
    },
    storeDate: function(dateString) {
      var date = moment(dateString).format('YYYY-MM-DD');
      return date;
    }
  },
  computed: {
    totalHours: function(){
      var total = 0;
      this.times.forEach((time) => {
        total += parseFloat(time.hours);
      });
      return total;
    }
  }
});
