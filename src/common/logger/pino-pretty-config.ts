export const pinoPrettyConfig = {
  colorize: true, // Adds color to the output
  translateTime: 'HH:MM:ss.l', // Human-readable time format
  singleLine: true, // Outputs logs in a single line
  ignore: 'pid,hostname,req.headers,res.headers', // Ignore less useful fields
  messageFormat: (log, messageKey) => {
    const { req, res, responseTime } = log;
    if (req && res) {
      return `[${log.context}] ${req.method} ${req.url} ${res.statusCode} - ${responseTime}ms`;
    }
    return `[${log.context}] ${log[messageKey]}`;
  },
};
