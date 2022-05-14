FROM node:16

WORKDIR /app

COPY . .

RUN npm install

RUN mkdir /app/.next -p
RUN chmod 0777 -R /app/.next
RUN chown -Rh $user:$user /app/.next

EXPOSE 3000

CMD [""]
