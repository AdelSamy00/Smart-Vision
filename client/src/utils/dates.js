const DATE = new Date()

export default function getTodayDate() {
    return DATE.toISOString().substring(0, 10)
}