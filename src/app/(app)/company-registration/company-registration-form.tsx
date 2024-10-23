'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import CurrencyInput from 'react-currency-input-field'
import { Controller, useForm } from 'react-hook-form'
import { FaRegCheckCircle } from 'react-icons/fa'
import { LuUpload } from 'react-icons/lu'
import { toast } from 'react-toastify'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  state: z.string().min(2, 'O estado deve ter pelo menos 2 caracteres').toUpperCase(),
  clients: z.coerce.number().int().nonnegative('O número de clientes deve ser positivo'),
  minKwh: z.coerce.number().int().min(1, 'O mínimo de kWh deve ser maior que 0'),
  costKwh: z.string().refine(
    (val) => {
      const numericValue = parseFloat(val.replace(/[^\d,.-]/g, '').replace(',', '.'))
      return numericValue >= 0.01
    },
    {
      message: 'O custo por kWh deve ser no mínimo R$ 0,01',
    },
  ),
  logoImg: z.any().refine((files) => files instanceof FileList && files.length > 0, {
    message: 'Por favor, insira uma imagem válida',
  }),
})

type CompanyRegistrationProps = z.infer<typeof registerSchema>

export function RegistrationForm({ userToken }: { userToken: string }) {
  const queryClient = useQueryClient()

  // Controlar icon do input da imagem
  const [hasImage, setHasImage] = useState(false)

  // Preparar formulario e validações
  const { control, register, handleSubmit, reset } = useForm<CompanyRegistrationProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      state: '',
      clients: 0,
      minKwh: 1,
      costKwh: '',
      logoImg: undefined as unknown as FileList,
    },
  })

  /// Função para envio do formulário para a api
  const { mutateAsync: createCompany } = useMutation({
    mutationFn: async (companyData: FormData) => {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company-registration`, companyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['search-supplier', 'list-companies'],
        exact: true,
      })
    },
  })

  async function handleRegister(companyData: CompanyRegistrationProps) {
    const formData = new FormData()

    // Adicionar os campos de texto ao FormData
    formData.append('name', companyData.name)
    formData.append('state', companyData.state)
    formData.append('clients', companyData.clients.toString())
    formData.append('minKwh', companyData.minKwh.toString())
    formData.append('costKwh', companyData.costKwh)

    // Adicionar o arquivo ao FormData
    if (companyData.logoImg && companyData.logoImg[0]) {
      formData.append('logoImg', companyData.logoImg[0]) // Pega o primeiro arquivo
    }

    // Enviar para a API
    try {
      await createCompany(formData)

      reset()

      setHasImage(false)

      toast.success('Dados enviados com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar os dados. Tente novamente.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} encType="multipart/form-data" className="space-y-6">
      {/* Nome do fornecedor */}
      <section>
        <label htmlFor="name" className="mb-2 ml-1 block text-xs font-bold text-zinc-500">
          Nome do fornecedor
        </label>
        <input
          id="name"
          {...register('name')}
          type="text"
          placeholder="Nome do fornecedor"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 transition focus:border-gray-400 focus:shadow-md focus:shadow-gray-200 focus:outline-none"
        />
      </section>

      {/* Estado de origem e Total de clientes */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="state" className="mb-2 ml-1 block text-xs font-bold text-zinc-500">
            Estado de origem
          </label>
          <input
            id="state"
            {...register('state')}
            type="text"
            onChange={(e) => e.target.value.toLocaleUpperCase()}
            placeholder="Estado de origem"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 transition focus:border-gray-400 focus:shadow-md focus:shadow-gray-200 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="clients" className="mb-2 ml-1 block text-xs font-bold text-zinc-500">
            Total de clientes
          </label>
          <input
            id="clients"
            {...register('clients')}
            type="number"
            placeholder="Quantidade de clientes atual"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 transition focus:border-gray-400 focus:shadow-md focus:shadow-gray-200 focus:outline-none"
          />
        </div>
      </section>

      {/* Limite mínimo de kWh e Custo por kWh */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="min-kwh" className="mb-2 ml-1 block text-xs font-bold text-zinc-500">
            Limite mínimo de kWh
          </label>
          <div className="relative w-full">
            <input
              id="min-kwh"
              {...register('minKwh')}
              type="number"
              placeholder="Limite mínimo"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 transition focus:border-gray-400 focus:shadow-md focus:shadow-gray-200 focus:outline-none"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">kWh</span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="cost-kwh" className="mb-2 ml-1 block text-xs font-bold text-zinc-500">
            Custo por kWh
          </label>
          <Controller
            name="costKwh"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <CurrencyInput
                id="cost-kwh"
                placeholder="R$ 0,00"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition focus:border-gray-400 focus:shadow-md focus:shadow-gray-200 focus:outline-none"
                prefix="R$ "
                decimalSeparator=","
                groupSeparator="."
                decimalsLimit={2}
                value={value}
                onValueChange={(value) => onChange(value)} // Passa o valor formatado para o `react-hook-form`
                ref={ref} // Conecta a referência com o input
              />
            )}
          />
        </div>
      </section>

      {/* Upload da logo da empresa */}
      <section>
        <label htmlFor="logo-upload" className="mb-2 block text-xs font-bold text-zinc-500">
          Logo da empresa
        </label>
        <div className="relative">
          <input
            id="logo-upload"
            {...register('logoImg')}
            type="file"
            accept="image/*"
            onChange={(e) => (e.target.files?.length !== 1 ? setHasImage(false) : setHasImage(true))}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
          />
          <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-8">
            {hasImage ? <FaRegCheckCircle size={32} color="#9ca3af" /> : <LuUpload size={32} color="#9ca3af" />}
          </div>
        </div>
      </section>

      <section className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="w-full rounded-lg bg-gray-200 px-5 py-1 font-bold text-slate-800 shadow-sm transition-all hover:-translate-y-px hover:shadow-md active:translate-y-px active:opacity-85 active:shadow-sm sm:w-auto"
        >
          Limpar
        </button>
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-5 py-2 text-white shadow-sm transition-all hover:-translate-y-px hover:shadow-md active:translate-y-px active:opacity-85 active:shadow-sm sm:w-auto"
        >
          Cadastrar fornecedor
        </button>
      </section>
    </form>
  )
}
