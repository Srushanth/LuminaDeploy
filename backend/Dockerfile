# Stage 1: Download the model
FROM ollama/ollama AS downloader

# Start ollama and pull the model
RUN ollama serve & sleep 5 && ollama pull llama2

# Stage 2: Final production image
FROM ollama/ollama

# Copy the pre-downloaded model from the downloader stage
COPY --from=downloader /root/.ollama /root/.ollama

# Cloud Run requires listening on port 8080
ENV OLLAMA_HOST=0.0.0.0:8080
EXPOSE 8080

ENTRYPOINT ["ollama", "serve"]
