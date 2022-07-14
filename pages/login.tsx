import * as React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/material'
import { Button } from '@mui/material'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'

type Inputs = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().required().email('invalid email format'),
    password: yup.string().required().min(6),
  })
  .required()

type Props = {}

export default function login({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  interface State {
    password: string
    showPassword: boolean
  }

  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ maxWidth: 345, align: 'center' }}>
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpeg"
            alt="Paella dish"
          />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="email"
                id="email"
                error={!!errors.email}
                sx={{ m: 1, width: '25ch' }}
                {...register('email')}
              />
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  {...register('password')}
                  id="password"
                  error={!!errors.password}
                  type={values?.showPassword ? 'text' : 'password'}
                  value={values?.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values?.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
