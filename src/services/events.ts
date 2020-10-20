import { Event } from '~/interfaces/event'
import CrudFactory from './crudFactory'

const EventsService = new CrudFactory<Event>('/events')

export default EventsService
