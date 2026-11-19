FROM mcr.microsoft.com/playwright:v1.56.1-noble

WORKDIR /workspace

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV BASE_URL=http://127.0.0.1:4173/

COPY package.json package-lock.json ./
RUN npm ci

COPY app ./app
COPY features ./features
COPY cucumber.js ./

CMD ["npm", "test"]
