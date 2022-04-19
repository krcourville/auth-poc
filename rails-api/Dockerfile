FROM ruby:3.1.1

RUN apt-get update -qq && apt-get install -y nodejs

WORKDIR /app

COPY api/Gemfile* ./
RUN bundle install