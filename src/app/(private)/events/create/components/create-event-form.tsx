"use client";

import { ControlledDateTimePicker } from "@/components/form/controllers/controlled-date-time-picker";
import { ControlledImages } from "@/components/form/controllers/controlled-images";
import { ControlledInput } from "@/components/form/controllers/controlled-input";
import { ControlledMultiSelect } from "@/components/form/controllers/controlled-multi-select";
import { ControlledSelect } from "@/components/form/controllers/controlled-select";
import { ControlledTextarea } from "@/components/form/controllers/controlled-text-area";

import { Button } from "@/components/ui/button";
import { createEvent } from "@/domains/events/actions";
import { CreateEvent, Event, PriceType } from "@/domains/events/types";
import { getTags } from "@/domains/tags/client";
import { TagsType } from "@/domains/tags/enums";
import { useServerAction } from "@/hooks/use-server-action";
import { QueryKeys } from "@/lib/tanstack-query/keys";
import { refetchQuery } from "@/lib/tanstack-query/methods";
import { regexPatterns } from "@/utils/regex";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function CreateEventForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<CreateEvent>({
    mode: "onChange",
    defaultValues: {
      address: {
        street: "Br 135",
        number: "Ao lado da maçonaria",
        zipCode: "64900000",
        neighborhood: "Ademar Diógenes",
        latitude: -9.076392618346015,
        longitude: -44.35984648835719,
        municipalityId: "33fd8733-25c5-4cbc-a346-280e369c2d80"
      }
    }
  });
  
  const { mutateAsync, isPending } = useServerAction<Event, CreateEvent>({
  mutationFn: (data) => createEvent(data),
  onSuccess: async () => {
     await refetchQuery([QueryKeys.EventsList]);
    router.back();
  },
  });

  const { data: tags, isLoading: isLoadingTags } = useQuery({
    queryKey: [QueryKeys.Tags, TagsType.event],
    queryFn: () => getTags([TagsType.event]),
  });


const onSubmit = async (body: CreateEvent) => {
  await mutateAsync(body);
};

 

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <ControlledImages
        name="coverUrl"
        control={control}
        label="Imagem de Capa"
        placeholder="Escolha a imagem de capa do evento"
        rules={{ required: "Imagem de capa é obrigatória!" }}
      />
      <ControlledInput
        name="name"
        control={control}
        label="Nome"
        placeholder="Nome do evento"
        rules={{ required: "Nome do evento é obrigatório!" }}
      />
      <ControlledTextarea
        name="description"
        control={control}
        label="Descrição"
        placeholder="Descrição do evento"
        rules={{ required: "Descrição do evento é obrigatória!" }}
      />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ControlledSelect
          name="priceType"
          placeholder="Selecione o tipo de preço"
          control={control}
          label="Tipo de Preço"
          options={[
            { id: PriceType.free, name: "Gratuito" },
            { id: PriceType.paid, name: "Pago" },
          ]}
          rules={{ required: "Tipo de preço é obrigatório!" }}
          className="w-full"
        />
        <ControlledDateTimePicker
          className="w-full"
          name="startDate"
          control={control}
          label="Data e Hora de Início"
          placeholder="Selecione a data e hora de início do evento"
          rules={{
            required: "Data e hora de início são obrigatórias!",
            validate: (value) => {
              if (endDate && value! >= endDate) {
                return "Data de início deve ser antes da data de término";
              }
              return true;
            },
          }}
        />
        <ControlledDateTimePicker
          className="w-full"
          name="endDate"
          control={control}
          label="Data e Hora de Término"
          placeholder="Selecione a data e hora de término do evento"
          rules={{
            required: "Data e hora de término são obrigatórias!",
            validate: (value) => {
              if (startDate && value! <= startDate) {
                return "Data de término deve ser depois da data de início";
              }
              return true;
            },
          }}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ControlledInput
          name="instagram"
          control={control}
          label="Instagram"
          placeholder="Link do Instagram do evento"
          rules={{
            pattern: {
              value: regexPatterns.instagramUrl,
              message: "Insira uma URL válida do Instagram",
            },
          }}
        />
        <ControlledInput
          name="facebook"
          control={control}
          label="Facebook"
          placeholder="Link do Facebook do evento"
          rules={{
            pattern: {
              value: regexPatterns.facebookUrl,
              message: "Insira uma URL válida do Facebook",
            },
          }}
        />
        <ControlledInput
          name="website"
          control={control}
          label="Website"
          placeholder="Link do Website do evento"
          rules={{
            pattern: {
              value: regexPatterns.url,
              message: "Insira uma URL válida do site",
            },
          }}
        />
      </div>
      <ControlledImages
        name="bannerUrl"
        control={control}
        label="Imagem de Banner"
        placeholder="Escolha a imagem de banner do evento"
      />

      <ControlledMultiSelect
        name="tagsId"
        control={control}
        label="Categorias"
        placeholder="Escolha as categorias do evento"
        options={tags}
        maxCount={9}
        loading={isLoadingTags}
        rules={{
          required: "Categorias do evento são obrigatórias!",
          validate: (value) =>
            (Array.isArray(value) && value.length > 2) ||
            "Selecione ao menos 3 categorias",
        }}
      />

      <ControlledImages
        name="images"
        control={control}
        label="Imagens"
        placeholder="Escolha as imagens do evento"
        multiple
        limit={5}
        rules={{ required: "Ao menos uma imagem é obrigatória!" }}
      />

     
      <div className="flex items-center gap-2">
        <Link href={`/events`}>
          <Button variant="outline" type="button">
            Cancelar
          </Button>
        </Link>
        <Button type="submit" loading={isPending} disabled={isSubmitting}>
          Criar evento
        </Button>
      </div>
    </form>
  );
}
