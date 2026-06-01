FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
  curl \
  git \
  unzip \
  ca-certificates \
  gnupg \
  && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Install Node.js (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

# Install Claude Code CLI
RUN npm install -g @anthropic-ai/claude-code

WORKDIR /workspace

EXPOSE 3000