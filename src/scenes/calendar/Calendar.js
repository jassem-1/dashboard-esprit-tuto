import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core";
import axios from "axios";


function Calendar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);
    const calendarRef = useRef(); 
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await axios.get('http://localhost:8080/events');
            const events = response.data;
            setCurrentEvents(events);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
      
        fetchEvents();
      }, []);
      
    const handleDateClick = async (selected) => {
        const calendarApi = selected.view.calendar;
    calendarApi.unselect();
        const title = prompt("Please enter a new title for your event");

        if (title) {
            const newEvent = {
                title,
                start: selected.end.toISOString(),
                end: selected.end.toISOString(),
            };

            try {
                const response = await axios.post("http://localhost:8080/events", newEvent);

                const updatedAllEvents = [...currentEvents, response.data];
                setCurrentEvents(updatedAllEvents);
           
               
            } catch (error) {
                console.error('Error creating event:', error);
            }
        }
    };
  
    const handleEventClick = async (selected) => {
        if (
            window.confirm(
              `Are you sure you want to delete the event '${selected.event.title}'`
            )
          ) {
            try {
                const eventId = selected.event.id;

      console.log("Deleting event with ID:", eventId);

      await axios.delete(`http://localhost:8080/events/${eventId}`);

      
      selected.event.remove();

      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );

      console.log("Event removed successfully.");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }
    };
    function EventSidebar({ events }) {
  const colors = tokens(useTheme().palette.mode);

  return (
    <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
      <Typography variant="h5">Events</Typography>
      <List key={events.length}>
        {events.map((event) => (
          <ListItem
            key={event.id}
            sx={{
              backgroundColor: colors.greenAccent[500],
              margin: "10px 0",
              borderRadius: "2px",
            }}
          >
            <ListItemText
              primary={event.title}
              secondary={
                <Typography>
                  {formatDate(event.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
  
    return (
      <Box m="20px">
        <Header title="Calendar" />
  
        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <EventSidebar events={currentEvents} />

          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,

              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              events={currentEvents}
            />
          </Box>
        </Box>
      </Box>
    );
}

export default Calendar