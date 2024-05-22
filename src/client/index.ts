import { fetchEventSource, FetchEventSourceInit } from '@microsoft/fetch-event-source';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useRef, useState } from 'react';

import apis from '@/client/apis';
import { ChatCompletionsResponse, CompletionsResponse, GPTModel, OpenAIModel } from '@/types';

let baseUrl = apis.baseUrl;
const { endpoints } = apis;

const client = axios.create({ baseURL: baseUrl });

export function setApiBaseUrl(url: string) {
  client.defaults.baseURL = url;
  baseUrl = url;
}

export function useAxios(config: AxiosRequestConfig) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await client.request({
          signal: controllerRef.current.signal,
          ...config,
        });

        setData(response.data);
      } catch (error) {
        const { detail } = error as Record<string, string>;
        setError(detail);
      } finally {
        setLoaded(true);
      }
    })();
  }, [config]);

  return { data, error, loaded, cancel };
}

export async function completions(
  token: string,
  prompt: string,
  query: string,
  model: Omit<OpenAIModel, GPTModel> = 'text-davinci-003',
  temperature = 0,
  maxTokens = 4096,
  topP = 1,
  frequencyPenalty = 1,
  presencePenalty = 1,
) {
  const { url, headers } = endpoints.v1.completions;
  const config = {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    prompt: `${prompt}:\n\n"${query}" =>`,
    model,
    temperature,
    // eslint-disable-next-line camelcase
    max_tokens: maxTokens,
    // eslint-disable-next-line camelcase
    top_p: topP,
    // eslint-disable-next-line camelcase
    frequency_penalty: frequencyPenalty,
    // eslint-disable-next-line camelcase
    presence_penalty: presencePenalty,
  };

  const response = await client.post<CompletionsResponse>(url, body, config);
  return response;
}

export async function chatCompletions(
  token: string,
  prompt: string,
  query: string,
  model: GPTModel = 'gpt-3.5-turbo',
  temperature = 0,
  maxTokens = 4096,
  topP = 1,
  frequencyPenalty = 1,
  presencePenalty = 1,
) {
  const { url, headers } = endpoints.v1.chat.completions;
  const config = {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    model,
    temperature,
    // eslint-disable-next-line camelcase
    max_tokens: maxTokens,
    // eslint-disable-next-line camelcase
    top_p: topP,
    // eslint-disable-next-line camelcase
    frequency_penalty: frequencyPenalty,
    // eslint-disable-next-line camelcase
    presence_penalty: presencePenalty,
    messages: [
      {
        role: 'system',
        content:
          '-- Roles and Goal: 一位多才多艺、全面综合的翻译官，能够处理包括技术文件、法律合同、文学作品和日常对话在内的各种内容。在翻译过程中，不仅会准确传达文本的字面意思，还会注意其细微差别、文化参照和语气。此外，会保持翻译的一致性和风格，特别注意成语、幽默和文字游戏，确保原文的精髓得到巧妙保留并顺利转换为目标语言。致力于提供不仅语法正确，而且适合上下文并吸引目标受众的翻译。\n' +
          '- Constrains: \n' +
          '  1. 不重复用户的原始输入。\n' +
          '  2. 准确传达原文的事实和背景，不丢失任何细节。\n' +
          '  3. 保留原始段落格式，术语如FLAC，JPEG等，公司缩写如Microsoft, Amazon等。\n' +
          '  4. 保留引用的论文格式，如[20]。\n' +
          '  5. 输入输出格式均为Markdown。\n' +
          '  6. 如用户指定翻译语气，需遵循用户指定的风格。\n' +
          '  7. 无法直接翻译的内容需联系用户确认。\n' +
          '  8. 只会给出最终的翻译结果，不会提供其他任何内容。\n' +
          '  9. 拒绝翻译服务以外的一切请求。',
      },
      { role: 'user', content: prompt + ':' + `${query}` },
    ],
  };

  const response = await client.post<ChatCompletionsResponse>(url, body, config);
  return response;
}

export async function chatCompletionsStream(
  params: {
    token: string;
    prompt: string;
    query: string;
    model?: GPTModel;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  },
  options: FetchEventSourceInit,
) {
  const {
    token,
    prompt,
    query,
    model = 'gpt-3.5-turbo',
    temperature = 0,
    maxTokens = 4096,
    topP = 1,
    frequencyPenalty = 1,
    presencePenalty = 1,
  } = params;
  const { url, headers } = endpoints.v1.chat.completions;

  const body = {
    // model,
    temperature,
    // // eslint-disable-next-line camelcase
    // max_tokens: maxTokens,
    // // eslint-disable-next-line camelcase
    // top_p: topP,
    // // eslint-disable-next-line camelcase
    // frequency_penalty: frequencyPenalty,
    // // eslint-disable-next-line camelcase
    // presence_penalty: presencePenalty,
    system:
      '一位多才多艺、全面综合的翻译官，能够处理包括技术文件、法律合同、文学作品和日常对话在内的各种内容。在翻译过程中，不仅会准确传达文本的字面意思，还会注意其细微差别、文化参照和语气。此外，会保持翻译的一致性和风格，特别注意成语、幽默和文字游戏，确保原文的精髓得到巧妙保留并顺利转换为目标语言。致力于提供不仅语法正确，而且适合上下文并吸引目标受众的翻译。' +
      '  1. 不重复用户的原始输入。' +
      '  2. 准确传达原文的事实和背景，不丢失任何细节。' +
      '  3. 保留原始段落格式，术语如FLAC，JPEG等，公司缩写如Microsoft, Amazon等。' +
      '  4. 保留引用的论文格式，如[20]。' +
      '  5. 输入输出格式均为Markdown。' +
      '  6. 如用户指定翻译语气，需遵循用户指定的风格。' +
      '  7. 无法直接翻译的内容需联系用户确认。' +
      '  8. 只会给出最终的翻译结果，不会提供其他任何内容。' +
      '  9. 拒绝翻译服务以外的一切请求。',
    stream: true,
    messages: [
      // {
      //   role: 'user',
      //   content:
      //     '-- Roles and Goal: 一位多才多艺、全面综合的翻译官，能够处理包括技术文件、法律合同、文学作品和日常对话在内的各种内容。在翻译过程中，不仅会准确传达文本的字面意思，还会注意其细微差别、文化参照和语气。此外，会保持翻译的一致性和风格，特别注意成语、幽默和文字游戏，确保原文的精髓得到巧妙保留并顺利转换为目标语言。致力于提供不仅语法正确，而且适合上下文并吸引目标受众的翻译。\n' +
      //     '- Constrains: \n' +
      //     '  1. 不重复用户的原始输入。\n' +
      //     '  2. 准确传达原文的事实和背景，不丢失任何细节。\n' +
      //     '  3. 保留原始段落格式，术语如FLAC，JPEG等，公司缩写如Microsoft, Amazon等。\n' +
      //     '  4. 保留引用的论文格式，如[20]。\n' +
      //     '  5. 输入输出格式均为Markdown。\n' +
      //     '  6. 如用户指定翻译语气，需遵循用户指定的风格。\n' +
      //     '  7. 无法直接翻译的内容需联系用户确认。\n' +
      //     '  8. 只会给出最终的翻译结果，不会提供其他任何内容。\n' +
      //     '  9. 拒绝翻译服务以外的一切请求。',
      // },
      { role: 'user', content: prompt + ':' + `${query}` },
    ],
  };
  // const response = await fetchEventSource(baseUrl + url, {
  //   method: 'POST',
  //   body: JSON.stringify(body),
  //   headers: {
  //     ...headers,
  //     Authorization: `Bearer ${token}`,
  //   },
  //   openWhenHidden: true,
  //   ...options,
  // });
  const response = await fetchEventSource(baseUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...headers,
    },
    openWhenHidden: true,
    ...options,
  });
  return response;
}

export default {
  setApiBaseUrl,
  useAxios,
  completions,
  chatCompletions,
  chatCompletionsStream,
};
